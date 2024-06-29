package com.jewelry_store.jewelry_store.service.Area;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jewelry_store.jewelry_store.model.Area;
import com.jewelry_store.jewelry_store.model.User;
import com.jewelry_store.jewelry_store.repository.AreaRepository;
import com.jewelry_store.jewelry_store.request.CreateAreaRequest;

@Service
public class AreaServiceImp implements AreaService {
    @Autowired
    private AreaRepository areaRepository;

    @Override
    public Area createArea(CreateAreaRequest req, User user) throws Exception {
        Optional<Area> existingArea = areaRepository.findByName(req.getName());
        if (existingArea.isPresent()) {
            throw new Exception("Area with the same name already exists");
        }

        if (user.getArea() != null) {
            throw new Exception("User is already associated with another area");
        }

        Area area = new Area();
        area.setName(req.getName());
        area.setDescription(req.getDesciption());
        area.setContactInformation(req.getContactInformation());
        area.setImages(req.getImages());
        area.setOpeningHours(req.getOpeningHours());
        area.setStaff(user);
        user.setArea(area);  // Thiết lập quan hệ hai chiều

        return areaRepository.save(area);
    }

    @Override
    public Area updateArea(Long areaId, CreateAreaRequest updateArea) throws Exception {
        Area area = findAreabyId(areaId);

        if (updateArea.getDesciption() != null) {
            area.setDescription(updateArea.getDesciption());
        }

        return areaRepository.save(area);
    }

    @Override
    public void deleteArea(Long areaId) throws Exception {
        Area area = findAreabyId(areaId);

        User user = area.getStaff();
        if (user != null) {
            user.setArea(null);
        }

        areaRepository.delete(area);
    }

    @Override
    public List<Area> getAllArea() {
        return areaRepository.findAll();
    }

    @Override
    public Area findAreabyId(Long id) throws Exception {
        Optional<Area> opt = areaRepository.findById(id);

        if (opt.isEmpty()) {
            throw new Exception("Area not found with id " + id);
        }
        return opt.get();
    }

    @Override
    public Area getAreabyUserId(Long userId) throws Exception {
        Area area = areaRepository.findByStaffId(userId);
        if (area == null) {
            throw new Exception("Area not found with Staff id " + userId);
        }
        return area;
    }

    @Override
    public Area updateAreaStatus(long id) throws Exception {
        Area area = findAreabyId(id);
        area.setOpen(!area.isOpen());
        return areaRepository.save(area);
    }
}
