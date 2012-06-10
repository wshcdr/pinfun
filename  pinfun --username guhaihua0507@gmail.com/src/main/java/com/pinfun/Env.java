package com.pinfun;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * @author haihua.gu <br>
 * Create on 2010-9-2
 */

public class Env {
	private final static String CONFIG_FILE = "config.properties";
	private static Map<String, String> config = new HashMap<String, String>();

	static {
		try {
			//InputStream in = new FileInputStream(Env.class.getResource("/" + CONFIG_FILE).getFile());
			InputStream in = Env.class.getResourceAsStream("/" + CONFIG_FILE);
			Properties p = new Properties();
			p.load(in);
			in.close();
			Enumeration<?> e = p.propertyNames();
			while(e.hasMoreElements()) {
				String key = (String) e.nextElement();
				config.put(key, p.getProperty(key));
			}
		} catch (Exception e) {
			throw new RuntimeException("failed to load config file[" + CONFIG_FILE + "]");
		}
	}
	
	public static String get(String name) {
		return config.get(name);
	}
}

