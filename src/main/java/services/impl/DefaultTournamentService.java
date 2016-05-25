package services.impl;

import entity.Tournament;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import repository.TournamentRepository;
import services.TournamentService;

import java.util.List;

@Service
public class DefaultTournamentService extends CrudServiceImpl<Tournament> implements TournamentService{

    @Autowired
    TournamentRepository tournamentRepository;

    @Override
    protected JpaRepository<Tournament, Long> getRepository() {
        return tournamentRepository;
    }

    @Override
    public Tournament create() {
        return new Tournament();
    }

    @Override
    public List<Tournament> findByYear(int year) {
        return tournamentRepository.findByYear(year);
    }
}
