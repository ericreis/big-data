package api.models;

import org.bson.Document;

import java.io.Serializable;
import java.util.List;

/**
 * Created by erikeft on 30/05/17.
 */
public class SearchResult implements Serializable
{
    private long count;

    private List<Document> data;

    public List<Document> getData() {
        return data;
    }

    public void setData(List<Document> data) {
        this.data = data;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
