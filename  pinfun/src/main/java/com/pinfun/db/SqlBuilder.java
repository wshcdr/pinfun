package com.pinfun.db;

/**
 * 
 * @author dingyong
 *
 */

public class SqlBuilder {

	/**
	 * get mysql pagination sql
	 * @param sql
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	public static String mySqlPagination(String sql, int pageNo, int pageSize) {
		int pNo = pageNo <= 0 ? 1 : pageNo;
		int pSize = pageSize <= 0 ? 1 : pageSize;
		
		int startIndex = (pNo - 1) * pSize;
		return "select ps.* from (" + sql + ") ps LIMIT " + startIndex + "," + pSize;
	}
	/**
	 * get select count sql
	 * @param sql
	 * @return
	 */
	public static String getCountSql(String sql) {
		return "select count(1) row_count from (" + sql + ")";
	}
}
