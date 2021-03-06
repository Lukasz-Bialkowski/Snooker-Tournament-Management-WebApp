package repository;

import config.JPAConfig;
import config.MvcConfig;
import config.ServiceConfig;
import entity.Tournament;
import junit.framework.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = {MvcConfig.class, JPAConfig.class, ServiceConfig.class})
public class ITournamentQueryTest {

    @Autowired
    TournamentRepository tournamentRepository;

    @Autowired
    MatchRepository matchRepository;

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    FrameRepository frameRepository;

    @Before
    public void setUp() {
        Tournament tournament = new Tournament();
        tournament.setCity("Toronto");
        tournament.setName("St. Vincent Tournament");
        tournament.setYear(2010);
        tournamentRepository.save(tournament);
    }

    @Test
    public void queryTest(){
        Assert.assertTrue("error", tournamentRepository.findTournamentByYearInWhichPlayerScoredAtLeast1000(2004).isEmpty());
    }

}
