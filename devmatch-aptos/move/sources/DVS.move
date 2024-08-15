module MyVotingSystem::Voting {

    use std::signer;
    use std::vector;
    use std::string;

    // Struct to store the voting data
    struct VotingData has key, store {
        owner: address,
        options: vector<string::String>,
        votes: vector<u64>,
    }

    // Initialize the voting with options
    public fun initialize_voting(owner: &signer, options: vector<string::String>) {
        let owner_addr = signer::address_of(owner);
        assert!(
            !exists<VotingData>(owner_addr),
            0
        );

        let num_options = vector::length(&options);
        let votes = vector::empty<u64>();

        // Initialize votes to 0 for each option
        let i = 0;
        while (i < num_options) {
            vector::push_back(&mut votes, 0);
            i = i + 1;
        };

        let voting_data = VotingData {
            owner: owner_addr,
            options,
            votes,
        };

        move_to(owner, voting_data);
    }

    // Cast a vote for a given option
    public fun cast_vote(voter: &signer, option_index: u64) acquires VotingData {
        let owner_addr = signer::address_of(voter);
        assert!(exists<VotingData>(owner_addr), 0);

        let voting_data = borrow_global_mut<VotingData>(owner_addr);
        let num_options = vector::length(&voting_data.options);
        assert!(option_index < num_options, 0);

        let current_votes_ref = vector::borrow_mut(&mut voting_data.votes, option_index);
        *current_votes_ref = *current_votes_ref + 1;
    }

    // Get the current vote count for an option
    public fun get_vote_count(voter: &signer, option_index: u64): u64 acquires VotingData {
        let owner_addr = signer::address_of(voter);
        let voting_data = borrow_global<VotingData>(owner_addr);
        let num_options = vector::length(&voting_data.options);
        assert!(option_index < num_options, 0);

        *vector::borrow(&voting_data.votes, option_index)
    }
}
