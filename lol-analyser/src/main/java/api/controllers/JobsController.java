package api.controllers;

import api.models.SearchResult;
import api.services.SparkService;
import org.bson.Document;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import scala.Tuple2;

import java.util.List;

/**
 * Created by ericreis on 5/25/17.
 */
@RestController
@RequestMapping("api/jobs")
public class JobsController
{
    private SparkService sparkService;

    public JobsController(SparkService sparkService)
    {
        this.sparkService = sparkService;
    }

    @RequestMapping("/")
    public String index()
    {
        return "Hello World!";
    }

    @RequestMapping("/count")
    public long count()
    {
        return this.sparkService.count();
    }

    @RequestMapping("/first")
    public Document first()
    {
        return this.sparkService.first();
    }

    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public SearchResult search(@RequestParam("text") String text)
    {
        return this.sparkService.search(text);
    }

    @RequestMapping(value = "/searchGrouped", method = RequestMethod.GET)
    public List<Tuple2<String,Iterable<Document>>> searchGrouped(@RequestParam("text") String text)
    {
        return this.sparkService.searchGroupByDate(text);
    }


}
