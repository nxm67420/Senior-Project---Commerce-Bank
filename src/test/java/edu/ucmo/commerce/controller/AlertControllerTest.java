package edu.ucmo.commerce.controller;

import edu.ucmo.commerce.dao.AlertDao;
import edu.ucmo.commerce.model.Alert;
import org.apache.catalina.connector.Response;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Transactional
public class AlertControllerTest {
    @Autowired
    private AlertController alertController;

    @Autowired
    private AlertDao alertDao;

    @Autowired
    private JdbcTemplate template;


    @Test
    public void findAlertsThatDoNotExist(){
        List<Alert> alert = alertController.getUserAlerts(-1);
        assertEquals(alert.size(), 0);
    }

    @Test
    public void findAlertsThatExists(){
        template.query("select id from alert",(rs, num) -> rs.getInt("id"))
        .forEach(id -> {
            Alert alert = alertController.returnOne(id);
            assertNotNull(alert);
            assertEquals(id,alert.getId());
        });
    }

    @Test
    public void testAlertPost(){
        Alert alert = new Alert("testhost","testappid","testfile","testagent","testprocess");
        long beforeAlerts = alertDao.count();
        alert = alertController.saveAlert(alert);
        long afterAlerts = alertDao.count();
        assertNotNull(alert.getId());
        assertEquals(beforeAlerts+1,afterAlerts);

        Alert newAlert = alertController.returnOne(alert.getId());
        assertEquals(alert.getId(),newAlert.getId());
        assertEquals(alert.getTimestamp(),newAlert.getTimestamp());
        assertEquals(alert.getApplication_id(),newAlert.getApplication_id());
        assertEquals(alert.getChange_agent(),newAlert.getChange_agent());
        assertEquals(alert.getChange_process(),newAlert.getChange_process());
    }

    @Test
    public void testPut(){
        Alert alert = new Alert("testhost","testappid","testfile","testagent","testprocess");
        alert = alertController.saveAlert(alert);
        alert.setAcknowledge_time(new Timestamp(System.currentTimeMillis()));
        alert.setChecked(true);
        alert.setKnown(false);
        alert.setMalicious(false);

        //Creates mock principal to pass in
        Principal mockPrincipal = Mockito.mock(Principal.class);
        alertController.update(alert,mockPrincipal);

        Alert newAlert = alertController.returnOne(alert.getId());
        assertNull(alert.getAcknowledge_user());
        assertEquals(true,newAlert.getChecked());

        assertEquals(alert.getAcknowledge_time(),newAlert.getAcknowledge_time());
        assertEquals(newAlert.getKnown(),false);
        assertEquals(newAlert.getMalicious(),false);
    }


}
