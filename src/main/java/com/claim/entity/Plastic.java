package com.claim.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="plastic")
public class Plastic {
	
	@Id
	@Column(name="id")
	private int id;
	
	@Column(name="kind", unique=true)
	private String kind;
	
	@ManyToMany(mappedBy = "dropOffPlastics", fetch = FetchType.LAZY)
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
