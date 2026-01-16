package com.contactapp.backend.Controller;

import com.contactapp.backend.Model.Contact;
import com.contactapp.backend.Model.User;
import com.contactapp.backend.Repository.ContactRepository;
import com.contactapp.backend.Repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contacts")
public class ContactController {

    private final ContactRepository contactRepository;
    private final UserRepository userRepository;

    public ContactController(ContactRepository contactRepository,
                             UserRepository userRepository) {
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
    }


    private User getLoggedInUser() {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        Long userId = (Long) auth.getPrincipal(); 

        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


    @PostMapping
    public Contact addContact(@RequestBody Contact contact) {

        User user = getLoggedInUser();
        contact.setUser(user);

        return contactRepository.save(contact);
    }


    @GetMapping
    public List<Contact> getMyContacts() {

        User user = getLoggedInUser();
        return contactRepository.findByUser(user);
    }


    @PutMapping("/{id}")
    public Contact updateContact(@PathVariable Long id,
                                 @RequestBody Contact updatedContact) {

        User user = getLoggedInUser();

        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        if (!contact.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not your contact");
        }

        contact.setName(updatedContact.getName());
        contact.setEmail(updatedContact.getEmail());
        contact.setPhone(updatedContact.getPhone());

        return contactRepository.save(contact);
    }


    @DeleteMapping("/{id}")
    public void deleteContact(@PathVariable Long id) {

        User user = getLoggedInUser();

        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        if (!contact.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not your contact");
        }

        contactRepository.delete(contact);
    }
}
