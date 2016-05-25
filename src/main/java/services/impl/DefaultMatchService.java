package services.impl;

import entity.Match;
import entity.Player;
import entity.Tournament;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import repository.MatchReposotory;
import services.MatchService;

@Service
public class DefaultMatchService extends CrudServiceImpl<Match> implements MatchService {

    @Autowired
    MatchReposotory matchReposotory;

    @Override
    protected JpaRepository<Match, Long> getRepository() {
        return matchReposotory;
    }

    @Override
    public Match create() {
        return new Match();
    }
}
