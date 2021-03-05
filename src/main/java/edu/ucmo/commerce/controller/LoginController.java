package edu.ucmo.commerce.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {

    //Path To Login Page
    @RequestMapping("/login")
    public String index() {
        return "login";
    }

//    public String verify(@ModelAttribute){
//        return "verify";
//    }

}

