package edu.ucmo.commerce.controller;

import edu.ucmo.commerce.model.User;
import edu.ucmo.commerce.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserDao userDao;

    //Returns List of Users
    @GetMapping
    public List<User> listUsers(){
        List<User> list = new ArrayList<>();
        userDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    //Returns Users By Specific Username
    @GetMapping("/{userName}")
    public User getUser(@PathVariable String userName){
        return userDao.findByUserName(userName);
    }

    @GetMapping("/username/request")
    public String currentUsername(Principal principal){
        return principal.getName();
    }
}