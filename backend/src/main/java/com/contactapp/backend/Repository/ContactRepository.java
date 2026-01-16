package com.contactapp.backend.Repository;

import com.contactapp.backend.Model.Contact;
import com.contactapp.backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {


    List<Contact> findByUser(User user);
}
