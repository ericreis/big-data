import com.mongodb.spark.MongoSpark;
import com.mongodb.spark.rdd.api.java.JavaMongoRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.SparkSession;
import org.bson.Document;

import java.util.concurrent.TimeUnit;

public final class GettingStartedMongo
{
    public static void main(final String[] args) throws InterruptedException
    {
        /* Create the SparkSession.
         * If config arguments are passed from the command line using --conf,
         * parse args for the values to set.
         */
        SparkSession spark = SparkSession.builder()
                .master("local")
                .appName("MongoSparkConnectorIntro")
                .config("spark.mongodb.input.uri", "mongodb://10.20.43.127/msi_crawler.msi_sp")
                .config("spark.mongodb.output.uri", "mongodb://10.20.43.127/msi_crawler.msi_sp")
                .getOrCreate();

        // Create a JavaSparkContext using the SparkSession's SparkContext object
        JavaSparkContext jsc = new JavaSparkContext(spark.sparkContext());

        // More application logic would go here...
        /*Start Example: Read data from MongoDB************************/
        JavaMongoRDD<Document> rdd = MongoSpark.load(jsc);
        /*End Example**************************************************/

        // Analyze data from MongoDB
//        System.out.println(rdd.count());
        System.out.println(rdd.first().toJson());

        TimeUnit.SECONDS.sleep(1000);

        jsc.close();

    }
}