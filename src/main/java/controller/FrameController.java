package controller;

import entity.Frame;
import entity.Match;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import services.FrameService;
import services.MatchService;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("tournaments/{tournamentId}/matches/{matchId}/frames")
public class FrameController {

    private static final Logger logger = LoggerFactory.getLogger(TournamentController.class);
    private final int NUMBER_OF_FRAMES_IN_MATCH = 12;

    @Autowired
    FrameService frameService;

    @Autowired
    MatchService matchService;

    private FrameService getService() {
        return this.frameService;
    }

    @RequestMapping(method = {RequestMethod.POST}, value = {"/save"})
    @ResponseBody
    public Frame save(@RequestBody Frame model, @PathVariable long matchId, HttpServletResponse response) {
        Match match = matchService.get(matchId);
        model.setMatch(match);

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

    @RequestMapping(method = RequestMethod.GET,value = "/listFrames")
    public ResponseEntity<?> listFrames(@PathVariable long matchId) {
        Match match = matchService.get(matchId);
//        if(match.)
        List<Frame> frames = new ArrayList<>();
        for (int i = 0; i < NUMBER_OF_FRAMES_IN_MATCH; i++) {
            frames.add(new Frame());
        }
        return new ResponseEntity<List<Frame>>(frames, HttpStatus.OK);
    }

    @RequestMapping(method = {RequestMethod.POST}, value = {"/saveFrames"})
    @ResponseBody
    public List<Frame> saveFrames(@RequestBody List<Frame> model, @PathVariable long matchId, HttpServletResponse response) {
        Match match = matchService.get(matchId);
        for (Frame frame : model) {
            frame.setMatch(match);
        }

        return this.getService().saveAllFrames(model);
    }

}
