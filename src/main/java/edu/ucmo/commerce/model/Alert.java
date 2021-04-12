package edu.ucmo.commerce.model;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;

@Entity
@Table(name = "alert")
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private Timestamp timestamp;
    @Column
    private String hostname;
    @Column
    private String application_id;
    @Column
    private String file;
    @Column
    private String change_agent;
    @Column
    private String change_process;
    @Column
    private Boolean checked;
    @Column
    private Boolean known;
    @Column
    private Boolean malicious;
    @Column
    private Timestamp acknowledge_time;
    @Column
    private String acknowledge_user;
    @Column
    private String control_number;

    public Alert(
            Timestamp timestamp,
            String hostname,
            String application_id,
            String file,
            String change_agent,
            String change_process,
            Boolean known,
            Boolean malicious,
            Timestamp acknowledge_time,
            String acknowledge_user,
            String control_number) {
        this.timestamp = timestamp;
        this.hostname = hostname;
        this.application_id = application_id;
        this.file = file;
        this.change_agent = change_agent;
        this.change_process = change_process;
        this.checked = true;
        this.known = known;
        this.malicious = malicious;
        this.acknowledge_time = acknowledge_time;
        this.acknowledge_user=acknowledge_user;
        this.control_number=control_number;
    }

    public Alert(
            Timestamp timestamp,
            String hostname,
            String application_id,
            String file,
            String change_agent,
            String change_process) {
        this.timestamp = timestamp;
        this.hostname = hostname;
        this.application_id = application_id;
        this.file = file;
        this.change_agent = change_agent;
        this.change_process = change_process;
        this.checked = false;
        this.known = null;
        this.malicious = null;
        this.acknowledge_time = null;
        this.acknowledge_user=null;
    }

    public Alert(
            String hostname,
            String application_id,
            String file,
            String change_agent,
            String change_process) {
        this.timestamp = new Timestamp(System.currentTimeMillis());
        this.hostname = hostname;
        this.application_id = application_id;
        this.file = file;
        this.change_agent = change_agent;
        this.change_process = change_process;
        this.checked = false;
        this.known = null;
        this.malicious = null;
        this.acknowledge_time = new Timestamp(System.currentTimeMillis());
        this.acknowledge_user = null;
    }
    public Alert(){
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public String getApplication_id() {
        return application_id;
    }

    public void setApplication_id(String application_id) {
        this.application_id = application_id;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getChange_agent() {
        return change_agent;
    }

    public Boolean getKnown() {
        return known;
    }

    public void setKnown(Boolean known) {
        this.known = known;
    }

    public Boolean getMalicious() {
        return malicious;
    }

    public void setMalicious(Boolean malicious) {
        this.malicious = malicious;
    }

    public void setChange_agent(String change_agent) {
        this.change_agent = change_agent;
    }

    public String getChange_process() {
        return change_process;
    }

    public void setChange_process(String change_process) {
        this.change_process = change_process;
    }

    public Timestamp getAcknowledge_time() {
        return acknowledge_time;
    }

    public void setAcknowledge_time(Timestamp acknowledge_time) {
        this.acknowledge_time = acknowledge_time;
    }

    public String getControl_number() {
        return control_number;
    }

    public void setControl_number(String control_number) {
        this.control_number = control_number;
    }

    @Override
    public String toString() {
        return "Alert{" +
                "id=" + id +
                ", timestamp=" + timestamp +
                ", hostname='" + hostname + '\'' +
                ", application_id='" + application_id + '\'' +
                ", file='" + file + '\'' +
                ", change_agent='" + change_agent + '\'' +
                ", change_process='" + change_process + '\'' +
                ", checked=" + checked +
                ", known=" + known +
                ", malicious=" + malicious +
                ", acknowledge_time=" + acknowledge_time +
                ", acknowledge_user='" + acknowledge_user + '\'' +
                '}';
    }

    public String getAcknowledge_user() {
        return acknowledge_user;
    }

    public void setAcknowledge_user(String acknowledge_user) {
        this.acknowledge_user = acknowledge_user;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }
}