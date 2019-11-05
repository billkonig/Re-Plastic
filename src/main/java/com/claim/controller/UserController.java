package com.claim.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.claim.entity.User;
import com.claim.repository.UserRepository;

@RestController
@CrossOrigin   //NEVER do this (line 22) in the real world!  You will get hacked!!!
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@RequestMapping(value="/submitUserDetails", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public void submitUserDetails(@RequestBody User user) {
		this.userRepository.save(user);
	}

	@RequestMapping(value="/findUserById", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	private ResponseEntity<User>findUserById(String email){
	User user = this.userRepository.findById(email).get();
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@PostMapping(value="/login")
    @ResponseBody
    private ResponseEntity<User>login(@RequestBody User user) {
        Optional<User> databaseUser = this.userRepository.findById(user.getEmail());
        if (!databaseUser.isPresent()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }else if (user.getPassword().equals(databaseUser.get().getPassword())) {
            return new ResponseEntity<>(databaseUser.get(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
	}
	
	@RequestMapping(value="/findAllUsers", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	private ResponseEntity<List<User>>findAllUsers(){
	List<User> users = this.userRepository.findAll();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}
	
}
