package edu.ucmo.commerce.service;

import edu.ucmo.commerce.dao.UserDao;
import edu.ucmo.commerce.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class MyUserDetalisService implements UserDetailsService {

    //Created Object to Test Verification Process
    @Autowired
    private UserDao userDao;

    //Method uses 'userDao' to verify login credentials and grants authority over certain task, based on assigned 'role'
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userName){
        User user = userDao.findByUserName(userName);
        if(user == null){
            throw new UsernameNotFoundException(String.format("The username %s doesn't exist", userName));
        }

        List<GrantedAuthority> authorities = new ArrayList<>();

        if(user.getRole().equals("USER")){
            authorities.add(new SimpleGrantedAuthority("USER"));
        } else{
            authorities.add(new SimpleGrantedAuthority("ADMIN"));
        }

        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), true, true, true, true, authorities);
    }//End of Verification Function



}
