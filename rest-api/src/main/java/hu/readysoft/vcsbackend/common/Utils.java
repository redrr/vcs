package hu.readysoft.vcsbackend.common;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils {

    public static String getDate(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd").format(date);
    }
}
