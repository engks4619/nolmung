package com.a703.spot.config;

import org.hibernate.dialect.function.StandardSQLFunction;
import org.hibernate.spatial.dialect.mysql.MySQL56SpatialDialect;
import org.hibernate.spatial.dialect.mysql.MySQLSpatialDialect;
import org.hibernate.type.DoubleType;
import org.hibernate.type.StandardBasicTypes;

public class Mysql56Dialect extends MySQL56SpatialDialect {
    private MySQLSpatialDialect dialectDelegate = new MySQLSpatialDialect();

    public Mysql56Dialect() {
        super();
        this.registerFunction("ST_Distance_Sphere", new StandardSQLFunction("ST_Distance_Sphere", StandardBasicTypes.DOUBLE));
        this.registerFunction("COUNT", new StandardSQLFunction("COUNT", StandardBasicTypes.INTEGER));
        this.registerFunction("AVG", new StandardSQLFunction("AVG", StandardBasicTypes.DOUBLE));
    }
}
