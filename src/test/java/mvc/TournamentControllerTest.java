package mvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import controller.TournamentController;
import entity.Tournament;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import services.TournamentService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(MockitoJUnitRunner.class)
public class TournamentControllerTest {

    @InjectMocks
    private TournamentController tournamentController;

    @Mock
    private TournamentService tournamentService;

    private MockMvc mockMvc;

    ObjectMapper mapper = new ObjectMapper();

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(tournamentController).build();
    }

    @Test
    public void getTournamentResponseContentIsCorrect() throws Exception {
        Tournament tournament = new Tournament();
        tournament.setName("St. Vincent Snooker Competition");
        tournament.setYear(2004);

        when(tournamentService.get(1L)).thenReturn(tournament);

        mockMvc.perform(get("/tournaments/1"))
                .andExpect(jsonPath("$.name", is(tournament.getName())))
                .andExpect(jsonPath("$.year", is(tournament.getYear())))
                .andExpect(status().isOk());
    }

    @Test
    public void properServiceMethodsAreCalled() throws Exception{

        List<Tournament> tournaments = new ArrayList<>(Arrays.asList(new Tournament(),new Tournament(),new Tournament()));
        when(tournamentService.list()).thenReturn(tournaments);

        mockMvc.perform(get("/tournaments")).andReturn();
        verify(tournamentService,atLeast(1)).list();
    }

    @Test
    public void postRequestModelMappingTest() throws Exception {
        Tournament tournament = new Tournament();
        tournament.setYear(2010);
        tournament.setName("St. Vincent Snooker Competition");

        String jsonInString = mapper.writeValueAsString(tournament);
        System.out.println(jsonInString);

        when(tournamentService.save(Matchers.any(Tournament.class))).thenReturn(tournament);

        mockMvc.perform(post("/tournaments/save")
                .content(jsonInString)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(jsonPath("$.year", is(2010)))
                .andDo(print());
    }

}
