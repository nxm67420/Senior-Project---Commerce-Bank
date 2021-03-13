package edu.ucmo.commerce.configuration;

import edu.ucmo.commerce.service.MyUserDetalisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private MyUserDetalisService userDetalisService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
        auth
                .userDetailsService(userDetalisService)
                .passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .authorizeRequests()
                .antMatchers("/").hasAnyAuthority("USER","ADMIN")
                .antMatchers("/alerts").hasAnyAuthority("USER","ADMIN")
//                .antMatchers(HttpMethod.POST, "/alerts").permitAll()
                .antMatchers(HttpMethod.PUT, "/alerts/**").hasAnyAuthority("USER","ADMIN")
                .antMatchers("/users").hasAnyAuthority("ADMIN")
                .and()
                .formLogin()
                .usernameParameter("user_name")
                .passwordParameter("password")
                .loginPage("/login")
                .permitAll()
                .and()
                .logout()
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll();

        http.cors().and().csrf().disable();

    }
}
