package fr.insy2s.backend.domain;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
    private String role;

    public User(String username, String email, String password, String role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User() {

    }

    @OneToOne(mappedBy = "user")
    private Cart cart;

//    @OneToMany(mappedBy = "user")
//    private List<CustomerOrder> orders;

}
