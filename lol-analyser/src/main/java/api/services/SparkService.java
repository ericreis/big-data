package api.services;

import com.mongodb.spark.MongoSpark;
import com.mongodb.spark.rdd.api.java.JavaMongoRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.sql.SparkSession;
import org.bson.Document;
import org.springframework.stereotype.Service;

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
                .master("local")
                .appName("MongoSparkConnectorIntro")
                .config("spark.mongodb.input.uri", "mongodb://ec2-52-72-161-42.compute-1.amazonaws.com/msi_crawler.msi_sp")
                .config("spark.mongodb.output.uri", "mongodb://ec2-52-72-161-42.compute-1.amazonaws.com/msi_crawler.msi_sp")
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

    public Document search(String text)
    {
        JavaMongoRDD<Document> rdd = MongoSpark.load(jsc);
        JavaRDD<Document> filteredRdd = rdd.filter((Function<Document, Boolean>) document -> document.get("tweet_id").equals(text));

        return filteredRdd.first();
    }
}
