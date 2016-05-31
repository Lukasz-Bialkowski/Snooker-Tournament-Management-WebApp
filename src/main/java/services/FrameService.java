package services;

import entity.Frame;

import java.util.List;

public interface FrameService extends CrudService<Frame> {

    public List<Frame> saveAllFrames(List<Frame> frames);
    public void deleteAll(List<Frame> frames);
}
