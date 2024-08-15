import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { WalletDetails } from "@/components/WalletDetails";
import { NetworkInfo } from "@/components/NetworkInfo";
import { AccountInfo } from "@/components/AcoountInfo";

function App() {
  const { connected } = useWallet();

  // State management
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");
  const [voteIndex, setVoteIndex] = useState<number>(0);
  const [voteCount, setVoteCount] = useState<number | null>(null);

  // Placeholder functions for interacting with the contract
  const initializeVoting = async () => {
    // Logic to call the initialize_voting function from the contract
    console.log("Initializing voting with options:", options);
  };

  const castVote = async () => {
    // Logic to call the cast_vote function from the contract
    console.log("Casting vote for option index:", voteIndex);
  };

  const fetchVoteCount = async () => {
    // Logic to call the get_vote_count function from the contract
    console.log("Fetching vote count for option index:", voteIndex);
    // Placeholder for setting vote count
    setVoteCount(Math.floor(Math.random() * 100)); // Random number for now
  };

  const addOption = () => {
    setOptions([...options, newOption]);
    setNewOption("");
  };

  return (
    <>
      <Header />

      <div className="flex items-center justify-center flex-col">
        {connected ? (
          <Card>
            <CardContent className="flex flex-col gap-10 pt-6">
              <WalletDetails />
              <NetworkInfo />
              <AccountInfo />

              {/* Initialize Voting Section */}
              <div>
                <h2>Initialize Voting</h2>
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add a voting option"
                  className="input input-bordered w-full max-w-xs"
                />
                <button onClick={addOption} className="btn btn-primary mt-2">
                  Add Option
                </button>
                <div className="mt-4">
                  <h4>Options:</h4>
                  <ul>
                    {options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                  <button onClick={initializeVoting} className="btn btn-success mt-4">
                    Initialize Voting
                  </button>
                </div>
              </div>

              {/* Cast Vote Section */}
              <div>
                <h2>Cast Your Vote</h2>
                <input
                  type="number"
                  value={voteIndex}
                  onChange={(e) => setVoteIndex(parseInt(e.target.value))}
                  placeholder="Enter option index"
                  className="input input-bordered w-full max-w-xs"
                />
                <button onClick={castVote} className="btn btn-primary mt-2">
                  Vote
                </button>
              </div>

              {/* Fetch Vote Count Section */}
              <div>
                <h2>Get Vote Count</h2>
                <input
                  type="number"
                  value={voteIndex}
                  onChange={(e) => setVoteIndex(parseInt(e.target.value))}
                  placeholder="Enter option index"
                  className="input input-bordered w-full max-w-xs"
                />
                <button onClick={fetchVoteCount} className="btn btn-primary mt-2">
                  Fetch Count
                </button>
                {voteCount !== null && (
                  <div className="mt-4">
                    <h4>Vote Count for Option {voteIndex}: {voteCount}</h4>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <CardHeader>
            <CardTitle>To get started, connect a wallet</CardTitle>
          </CardHeader>
        )}
      </div>
    </>
  );
}

export default App;
