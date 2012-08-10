package com.pinfun.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.pinfun.model.dao.UserDao;
import com.pinfun.model.User;
import com.pinfun.db.DBUtil;;

public class UserDao {

	public User getUser(String userName) throws Exception {
		String sql = "select * from T_USER where NAME = ?";
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try {
			con = DBUtil.getConnection();
			pst = con.prepareStatement(sql);
			pst.setString(1, userName);
			rs = pst.executeQuery();
			if (rs.next()) {
				User u = new User();
				u.setId(rs.getLong("ID"));
				u.setName(rs.getString("NAME"));
				u.setPassword(rs.getString("PWD"));
				u.setType(rs.getString("TYPE"));
				u.setCreateTime(rs.getTimestamp("CREATE_TM"));
				return u;
			}
			return null;
		} catch (Exception e) {
			throw e;
		} finally {
			DBUtil.close(con, pst, rs);
		}
	}
}

