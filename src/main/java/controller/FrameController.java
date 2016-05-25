package controller;

import entity.Frame;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import services.FrameService;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping("frames")
public class FrameController {

    private static final Logger logger = LoggerFactory.getLogger(TournamentController.class);

    @Autowired
    FrameService frameService;

    private FrameService getService() {
        return this.frameService;
    }

    @RequestMapping(method = {RequestMethod.POST},value = {"/save"})
    @ResponseBody
    public Frame save(@RequestBody Frame model, HttpServletResponse response) {
        return this.getService().save(model);
    }

    @RequestMapping(method = {RequestMethod.DELETE},value = {"/{id}"})
    @ResponseBody
    public void remove(@PathVariable("id") Long id) {
        this.getService().remove(id);
    }

    @RequestMapping(method = {RequestMethod.GET},value = {"/create"})
    @ResponseBody
    public Frame create() {
        return this.getService().create();
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> list() {
        List<Frame> frames = this.getService().list();
        return new ResponseEntity<List<Frame>>(frames, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> get(@PathVariable Long id) {
        Frame frame = this.getService().get(id);
        return new ResponseEntity<Frame>(frame, HttpStatus.OK);
    }

}
