package hu.readysoft.vcsbackend.common.table;

import java.util.HashMap;

public class TableBuilder {

    HashMap<String, FilterType> columns = new HashMap<>();

    public TableBuilder column(String name) {
        columns.put(name, FilterType.EQUAL);
        return this;
    }

    public TableBuilder column(String name, FilterType filterType) {
        columns.put(name, filterType);
        return this;
    }

    public HashMap<String, FilterType> build() {
        return new HashMap<>(columns);
    }
}
