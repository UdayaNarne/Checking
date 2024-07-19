package com.example.typeface;

import com.opencsv.CSVReader;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class App {
    public static void main(String[] args) throws Exception {
        // Database connection details
        String jdbcUrl = "jdbc:mysql://localhost:3306/typeface";
        String username = "root";
        String password = "root@1234";

        // JDBC variables
        Connection conn = null;
        PreparedStatement ps = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(jdbcUrl, username, password);

            String sql = "INSERT INTO zomato VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            ps = conn.prepareStatement(sql);

            CSVReader reader = new CSVReader(new FileReader("/Users/narneudayasree/UdayaNarne/JSPs/JDBC2/archive/zomato.csv"));
            String[] line;
            reader.readNext();
            while ((line = reader.readNext()) != null) {
                for(int i = 0; i < line.length; i++) {
                    ps.setString(i + 1, line[i]);
                }
                
                ps.executeUpdate();
            }

            System.out.println("Data has been successfully inserted into the database.");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Close resources
            if (ps != null) {
                ps.close();
            }
            if (conn != null) {
                conn.close();
            }
            
        }
    }
}
