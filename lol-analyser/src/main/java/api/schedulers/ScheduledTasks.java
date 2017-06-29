package api.schedulers;

import java.io.*;
import java.nio.CharBuffer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @Scheduled(fixedRate = 60000)
    public void reportCurrentTime() throws IOException
    {
        Files.walk(Paths.get("src/main/resources/querySrc"))
                .filter(Files::isRegularFile)
                .map(Path::toFile)
                .forEach(file -> {
                    try
                    {
                        List<String> commands;
                        BufferedReader br = new BufferedReader(new FileReader(file));
                        commands = br.lines().collect(Collectors.toList());
                        br.close();

                        if (commands.size() >= 3)
                        {
                            String db = commands.get(0);
                            String collection = commands.get(1);
                            String params = commands.get(2);
                            String sinceId = commands.size() == 4 ? commands.get(3) : null;

                            Runtime rt = Runtime.getRuntime();
                            String finalCommand;
                            if (sinceId == null)
                            {
                                finalCommand = String.format("python ../twitter-crawler/main.py -db %s -collection %s %s", db, collection, params);
                            }
                            else
                            {
                                finalCommand = String.format("python ../twitter-crawler/main.py -db %s -collection %s %s -sinceid %s", db, collection, params, sinceId);
                            }

                            Process pr = rt.exec(finalCommand);
                            br = new BufferedReader(new InputStreamReader(pr.getInputStream()));
                            List<String> stringList;
                            stringList = br.lines().collect(Collectors.toList());
                            br.close();

                            sinceId = "";
                            if (stringList.size() == 1 && !stringList.get(0).equals(sinceId))
                            {
                                sinceId = stringList.get(0);
                                BufferedWriter bw = new BufferedWriter(new FileWriter(file));
                                bw.write(db + "\n");
                                bw.write(collection + "\n");
                                bw.write(params + "\n");
                                bw.write(sinceId + "\n");
                                bw.flush();
                                bw.close();
                            }
                        }
                    }
                    catch (Exception e)
                    {
                        e.printStackTrace();
                    }
                });

    }
}