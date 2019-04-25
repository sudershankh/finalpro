/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */


/*
  Sample transaction
  @param {org.example.evoting.vote} vote
  @transaction
 */
function vote(tx) {
    if (!tx.ifVotedAsset.votedOrNot) {
        tx.candidateVoteAsset.totalVote = tx.candidateVoteAsset.totalVote + 1;
        return getAssetRegistry('org.example.evoting.candidateVote')
            .then(function (assetRegistry) {
                return assetRegistry.update(tx.candidateVoteAsset);
            })
            .then(function () {
                return getAssetRegistry('org.example.evoting.ifVoted')
                    .then(function (assetRegistry) {
                        tx.ifVotedAsset.votedOrNot = true;
                        return assetRegistry.update(tx.ifVotedAsset);
                    })
            });
    } else {
        throw new Error('Vote already submitted!');
    }
}
