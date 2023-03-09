package com.example.lab1;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;


@WebServlet(name = "variablesServlet", value = "/variable")
public class VariablesServlet extends HttpServlet {
    private int i = 0;

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        processRequest(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        processRequest(request, response);
    }

    public void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            out.println("Wynik getMethod " + request.getMethod() + "<br>");
            out.println("Wynik getRemoteAddr " + request.getRemoteAddr() + "<br>");
            out.println("Wynik getServerName " + request.getServerName() + "<br>");
            out.println("Wynik getHeader(\"Accept\")" + request.getHeader("Accept") + "<br>");
            out.println("Wynik getHeader(\"Accept-Language\")" + request.getHeader("Accept-Language") + "<br>");
            out.println("Wynik getHeader(\"Accept-Encoding\")" + request.getHeader("Accept-Encoding") + "<br>");
            out.println("Wynik getHeader(\"User-Agent\")" + request.getHeader("User-Agent") + "<br>");
            int x = Integer.parseInt(request.getParameter("x"));
            int y = Integer.parseInt(request.getParameter("y"));
            int sum = x + y;
            out.println("Wynik dodawania " + request.getParameter("x") + "+" + request.getParameter("y") + "=" + sum + "<br>");
            i += 1;
            out.println("Licznik: " + i);
            out.println("<a href=\"/Lab1_war_exploded/\">Powrót do strony głównej</a>");
        } finally {
            out.close();
        }
    }
}