package entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.List;

@Entity
public class Match {

    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    @JoinColumn
    Tournament tournament;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL)
    @JsonBackReference
    List<Frame> frames;

    @OneToOne
    @JoinColumn
    Player firstPlayer;

    @OneToOne
    @JoinColumn
    Player secondPlayer;

    public Tournament getTournament() {
        return tournament;
    }

    public Player getFirstPlayer() {
        return firstPlayer;
    }

    public void setFirstPlayer(Player firstPlayer) {
        this.firstPlayer = firstPlayer;
    }

    public Player getSecondPlayer() {
        return secondPlayer;
    }

    public void setSecondPlayer(Player secondPlayer) {
        this.secondPlayer = secondPlayer;
    }

    public void setTournament(Tournament tournament) {
        this.tournament = tournament;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Frame> getFrames() {
        return frames;
    }

    public void setFrames(List<Frame> frames) {
        this.frames = frames;
    }

    @Override
    public String toString() {
        return "Match{" +
                "id=" + id +
                ", tournament=" + tournament +
                ", frames=" + frames +
                ", firstPlayer=" + firstPlayer +
                ", secondPlayer=" + secondPlayer +
                '}';
    }
}
