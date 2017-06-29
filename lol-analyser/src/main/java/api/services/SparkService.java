package api.services;

import api.models.SearchResult;
import com.mongodb.spark.MongoSpark;
import com.mongodb.spark.rdd.api.java.JavaMongoRDD;
import jersey.repackaged.com.google.common.collect.Lists;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.sql.SparkSession;
import org.bson.Document;
import org.springframework.stereotype.Service;
import scala.Tuple2;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by ericreis on 5/25/17.
 */
@Service
public class SparkService
{
    private JavaSparkContext jsc;

    public SparkService()
    {
        /* Create the SparkSession.
         * If config arguments are passed from the command line using --conf,
         * parse args for the values to set.
         */
        SparkSession spark = SparkSession.builder()
                .master("local[*]")
                .appName("MongoSparkConnectorIntro")
//                .config("spark.mongodb.input.uri", "mongodb://ec2-52-72-161-42.compute-1.amazonaws.com/msi_crawler.msi_sp")
//                .config("spark.mongodb.output.uri", "mongodb://ec2-52-72-161-42.compute-1.amazonaws.com/msi_crawler.msi_sp")
                .config("spark.mongodb.input.uri", "mongodb://10.20.43.127/msi_crawler.msi_sp")
                .config("spark.mongodb.output.uri", "mongodb://10.20.43.127/msi_crawler.msi_sp")
                .getOrCreate();

        // Create a JavaSparkContext using the SparkSession's SparkContext object
        this.jsc = new JavaSparkContext(spark.sparkContext());
    }

    public long count()
    {
        JavaMongoRDD<Document> rdd = MongoSpark.load(jsc);

        return rdd.count();
    }

    public Document first()
    {
        JavaMongoRDD<Document> rdd = MongoSpark.load(jsc);

        return rdd.first();
    }

    public SearchResult search(String text)
    {
        JavaMongoRDD<Document> rdd = MongoSpark.load(jsc);
        JavaRDD<Document> filteredRdd = rdd.filter((Function<Document, Boolean>) document -> document.get("text").toString().toLowerCase().contains(text));

        SearchResult result = new SearchResult();
        result.setData(filteredRdd.collect());
        result.setCount(filteredRdd.count());

        return result;
    }

    public List<Tuple2<String,SearchResult>> searchGroupByDate(String text)
    {
        JavaMongoRDD<Document> rdd = MongoSpark.load(jsc);
        JavaPairRDD<String, SearchResult> resultRdd = rdd
                .filter((Function<Document, Boolean>) document ->
                    document.get("text").toString().toLowerCase().contains(text))
                .groupBy((Function<Document, String>) document -> {
                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                    return dateFormat.format((Date)document.get("date"));
                })
                .mapValues((Function<Iterable<Document>, SearchResult>) documents -> {
                    List<Document> docs = Lists.newArrayList(documents);
                    SearchResult result = new SearchResult();
                    result.setData(docs);
                    result.setCount(docs.size());
                    return result;
                });

        return resultRdd.collect();
    }
}
