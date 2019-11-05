package com.claim.dto;

import java.util.List;
import com.claim.entity.DropOff;

public class PlasticDTO {

	private int id;	
	private String kind;
	private List<DropOff> plasticDropOffs;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getKind() {
		return kind;
	}
	public void setKind(String kind) {
		this.kind = kind;
	}
	public List<DropOff> getPlasticDropOffs() {
		return plasticDropOffs;
	}
	public void setPlasticDropOffs(List<DropOff> plasticDropOffs) {
		this.plasticDropOffs = plasticDropOffs;
	}
	
}
