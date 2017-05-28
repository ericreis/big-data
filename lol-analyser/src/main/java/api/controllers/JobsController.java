package api.controllers;

import api.services.SparkService;
import org.bson.Document;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by ericreis on 5/25/17.
 */
@RestController
@RequestMapping("jobs")
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
}
