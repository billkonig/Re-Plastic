package com.claim.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name="dropoff")
public class DropOff {

	@Id
	@Column(name="id")
	private int id;
	
	@Column(name="title")
	private String title;
	
	@Column(name="street_address", unique=true)
	private String streetAddress;
	
	@Column(name="zip_code")
	private String zipCode;	
	
	@Column(name="latitude")
	private String latitude;
	
	@Column(name="longitude")
	private String longitude;
	
	@Column(name="hours")
	private String hours;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			  name = "dropoff_plastics", 
			  joinColumns = @JoinColumn(name = "dropoff_id"), 
			  inverseJoinColumns = @JoinColumn(name = "plastic_id"))
	private List<Plastic> dropOffPlastics;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getStreetAddress() {
		return streetAddress;
	}

	public void setStreetAddress(String streetAddress) {
		this.streetAddress = streetAddress;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getHours() {
		return hours;
	}

	public void setHours(String hours) {
		this.hours = hours;
	}

	public List<Plastic> getDropOffPlastics() {
		return dropOffPlastics;
	}

	public void setDropOffPlastics(List<Plastic> dropOffPlastics) {
		this.dropOffPlastics = dropOffPlastics;
	}

}
