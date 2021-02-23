package edu.ucmo.commerce.model;

import javax.persistence.*;
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
    private int application_id;
    @Column
    private String file;
    @Column
    private String change_agent;
    @Column
    private String change_process;

    public Alert(
            Timestamp timestamp,
            String hostname,
            int application_id,
            String file,
            String change_agent,
            String change_process) {
        this.timestamp = timestamp;
        this.hostname = hostname;
        this.application_id = application_id;
        this.file = file;
        this.change_agent = change_agent;
        this.change_process = change_process;
    }

    public Alert(
            String hostname,
            int application_id,
            String file,
            String change_agent,
            String change_process) {
        this.timestamp = new Timestamp(System.currentTimeMillis());
        this.hostname = hostname;
        this.application_id = application_id;
        this.file = file;
        this.change_agent = change_agent;
        this.change_process = change_process;
    }
    public Alert(){
        this.timestamp = new Timestamp(System.currentTimeMillis());
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

    public int getApplication_id() {
        return application_id;
    }

    public void setApplication_id(int application_id) {
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

    public void setChange_agent(String change_agent) {
        this.change_agent = change_agent;
    }

    public String getChange_process() {
        return change_process;
    }

    public void setChange_process(String change_process) {
        this.change_process = change_process;
    }

    @Override
    public String toString() {
        return "Alert{" +
                "id=" + id +
                ", timestamp=" + timestamp +
                ", hostname='" + hostname + '\'' +
                ", application_id=" + application_id +
                ", file='" + file + '\'' +
                ", change_agent='" + change_agent + '\'' +
                ", change_process='" + change_process + '\'' +
                '}';
    }
}
