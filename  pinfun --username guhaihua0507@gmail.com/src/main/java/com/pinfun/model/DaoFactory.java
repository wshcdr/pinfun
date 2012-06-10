package com.pinfun.model;

import com.pinfun.model.dao.UserDao;

public class DaoFactory {

	private static UserDao userDao = new UserDao();
	
	public static UserDao getUserDao() {
		return userDao;
	}
}
