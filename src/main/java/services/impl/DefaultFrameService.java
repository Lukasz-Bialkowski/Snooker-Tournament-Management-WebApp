package services.impl;

import entity.Frame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import repository.FrameRepository;
import services.FrameService;

import java.util.List;

@Service
public class DefaultFrameService extends CrudServiceImpl<Frame> implements FrameService {

    @Autowired
    FrameRepository frameRepository;

    @Override
    protected JpaRepository<Frame, Long> getRepository() {
        return frameRepository;
    }

    @Override
    public Frame create() {
        return new Frame();
    }

    @Override
    public List<Frame> saveAllFrames(List<Frame> frames) {
        return frameRepository.save(frames);
    }

    @Override
    public void deleteAll(List<Frame> frames) {
        frameRepository.delete(frames);
    }

}
