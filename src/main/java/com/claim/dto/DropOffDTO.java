package com.claim.dto;

import java.util.List;
import com.claim.entity.Plastic;

public class DropOffDTO {

	private int id;	
	private String title;
	private String streetAddress;
	private String zipCode;	
	private String latitude;
	private String longitude;
	private String hours;
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
