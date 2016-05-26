package services.impl;

import entity.Match;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import repository.MatchRepository;
import services.MatchService;

@Service
public class DefaultMatchService extends CrudServiceImpl<Match> implements MatchService {

    @Autowired
    MatchRepository matchRepository;

    @Override
    protected JpaRepository<Match, Long> getRepository() {
        return matchRepository;
    }

    @Override
    public Match create() {
        return new Match();
    }
}
