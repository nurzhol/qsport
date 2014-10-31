package kz.qsport.service.impl;

import kz.qsport.model.User;
import kz.qsport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Service implementation for the User entity. Use the UserRepository to give standard service about the Skill entity. <br/>
 * "@Service" trigger the Spring bean nature.<br/>
 * "@Transactionnal" trigger the transactionnal nature of all bean methods.<br/>
 * Implements not only the application's UserService but also:<br/>
 * UserDetailsService: to use the service as Spring Security authentication provider.<br/>
 * InitializingBean: to have a callback after Spring loading in order to insert the first user in db if there is none.
 *
 * @see org.springframework.security.core.userdetails.UserDetailsService
 * @see org.springframework.beans.factory.InitializingBean
 */
@Service
// @Transactional
public class UserServiceImpl implements UserDetailsService{

    /**
     * Autowiring the repository implementation needed to do the job
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * This is the main (and only) method to implement to be a Spring Security authentication provider. It needs only to return the user corresponding
     * to the login in parameter or launch an exception if not exist. The password checking is fully managed by handling the UserDetails returned.<br/>
     * As the password checking is not our work, the password encoding can be configured in Spring Security. It's not done yet but it can be an
     * evolution of this tutorial.
     */
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByLogin(username);
        if (user == null) {
            throw new UsernameNotFoundException(username + " n'existe pas");
        } else {
            return user;
        }
    }


}
