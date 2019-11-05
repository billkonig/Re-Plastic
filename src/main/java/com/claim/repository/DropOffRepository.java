package com.claim.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.claim.entity.DropOff;
import com.claim.entity.Plastic;

@Repository
public interface DropOffRepository extends JpaRepository<DropOff, Integer> {
	
	List<DropOff> findAllByZipCode(String zipCode);
	
}
