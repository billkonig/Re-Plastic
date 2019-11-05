package com.claim.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.claim.entity.Plastic;

@Repository
public interface PlasticRepository extends JpaRepository<Plastic, Integer> {

}
