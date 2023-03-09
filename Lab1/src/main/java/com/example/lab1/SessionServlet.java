package com.example.lab1;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.io.PrintWriter;


@WebServlet(name = "sessionServlet", value = "/session")
public class SessionServlet extends HttpServlet {

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
            HttpSession session = request.getSession(true);
            String action = request.getParameter("akcja");
            if (action != null) {
                if (action.equals("wyloguj")) {
                    session.setAttribute("zalogowany", false);
                }
            }
            Boolean loggedIn = (Boolean) session.getAttribute("zalogowany");
            String user;
            String pass;
            user = request.getParameter("user");
            pass = request.getParameter("pass");
            if (user != null && pass != null) {
                if (user.equals("radek") && pass.equals("haslo")) {
                    loggedIn = true;
                    session.setAttribute("zalogowany", true);
                }
            }
            if (loggedIn == null) {
                loggedIn = false;
            }
            if (loggedIn) {
                out.println("<h3>Zalogowany</h3>");
                out.println("<form method=\"get\">");
                out.println("<input name=\"akcja\" value=\"wyloguj\" type=\"hidden\"/>");
                out.println("<input value=\"wyloguj\" type=\"submit\"/>");
                out.println("</form>");
            } else {
                out.println("<form method=\"get\">");
                out.println("<input name=\"user\" type=\"text\"/>");
                out.println("<input name=\"pass\" type=\"password\"/>");
                out.println("<input type=\"submit\"/>");
                out.println("</form>");
            }

            Cookie[] cookies = request.getCookies();
            Cookie licznik = null;
            if (cookies != null) {
                for (int i = 0; i < cookies.length; i++) {
                    if (cookies[i].getName().equals("licznik")) {
                        licznik = cookies[i];
                        break;
                    }
                }
            }
            if (licznik == null) {
                licznik = new Cookie("licznik", "0");
            } else {
                Integer v = Integer.parseInt(licznik.getValue());
                v++;
                licznik.setValue(v + "");
            }
            licznik.setMaxAge(86400);
            response.addCookie(licznik);
            out.println(licznik.getValue());
            out.println("<a href=\"/Lab1_war_exploded/\">Powrót do strony głównej</a>");
        } finally {
            out.close();
        }

    }

    public void destroy() {
    }
}