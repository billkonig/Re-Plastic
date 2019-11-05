package com.claim.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.claim.dto.DropOffDTO;
import com.claim.dto.PlasticDTO;
import com.claim.entity.DropOff;
import com.claim.entity.Plastic;
import com.claim.repository.DropOffRepository;
import com.claim.repository.PlasticRepository;

@RestController
@RequestMapping("metadata")
@CrossOrigin   //NEVER do this (line 26) in the real world!  You will get hacked!!!
public class MetaDataController {

	@Autowired DropOffRepository dropOffRepository;
	@Autowired PlasticRepository plasticRepository;
	
	@RequestMapping(value="/findDropOffs", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	@Transactional
	private ResponseEntity<List<DropOffDTO>>findDropOffs(){
		List<DropOff> dropOffs = dropOffRepository.findAll();
		List<DropOffDTO> dropOffsDto = new ArrayList<>();
		dropOffs.parallelStream().forEach(elem -> {
			DropOffDTO dto = new DropOffDTO();
			dto.setId(elem.getId());
			dto.setTitle(elem.getTitle());
			dto.setStreetAddress(elem.getStreetAddress());
			dto.setZipCode(elem.getZipCode());
			dto.setLatitude(elem.getLatitude());
			dto.setLongitude(elem.getLongitude());			
			dto.setHours(elem.getHours());
			dropOffsDto.add(dto);
		});
		return new ResponseEntity<>(dropOffsDto, HttpStatus.OK);
	}
	
	@RequestMapping(value="/findDropOffsByPlastic", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	@Transactional
	private ResponseEntity<List<DropOffDTO>>findDropOffsByPlastic(@RequestParam int id) {
		Optional<Plastic> plastic = plasticRepository.findById(id);
		List<DropOffDTO> dropOffsDto = new ArrayList<>();
		if(plastic.isPresent()) {
			plastic.get().getPlasticDropOffs().forEach(elem -> {
				DropOffDTO dto = new DropOffDTO();
				dto.setId(elem.getId());
				dto.setTitle(elem.getTitle());
				dto.setStreetAddress(elem.getStreetAddress());
				dto.setZipCode(elem.getZipCode());
				dto.setLatitude(elem.getLatitude());
				dto.setLongitude(elem.getLongitude());			
				dto.setHours(elem.getHours());
				dropOffsDto.add(dto);
			});		
		};
		return new ResponseEntity<>(dropOffsDto, HttpStatus.OK);
	}
	
	@RequestMapping(value="/findPlasticsByDropOff", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	@Transactional
	private ResponseEntity<List<PlasticDTO>>findPlasticsByDropOff(@RequestParam int id) {
		Optional<DropOff> dropOff = dropOffRepository.findById(id);
		List<PlasticDTO> plasticsDto = new ArrayList<>();
		if(dropOff.isPresent()) {
			dropOff.get().getDropOffPlastics().forEach(elem -> {
				PlasticDTO dto = new PlasticDTO();
				dto.setId(elem.getId());
				dto.setKind(elem.getKind());
				plasticsDto.add(dto);
			});		
		};
		return new ResponseEntity<>(plasticsDto, HttpStatus.OK);
	}
}
