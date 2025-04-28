export type Effect =
  | { kind: "DamageOpponent"; amount: number }
  | { kind: "DamageSelf"; amount: number }
  | { kind: "HealSelf"; amount: number }
  | {
      kind: "IfElse";
      condition: Condition;
      thenEffect: Effect;
      elseEffect: Effect;
    }
  | { kind: "RepeatFixed"; times: number; effect: Effect }
  | {
      kind: "RepeatForEach";
      scope: "EachSelfPokemon" | "EachOpponentPokemon";
      effect: Effect;
    }
  | { kind: "RepeatUntil"; condition: Condition; effect: Effect }
  | {
      kind: "RandomTarget";
      targets: "OpponentActive" | "OpponentBench" | "OpponentAny" | "SelfBench";
      effect: Effect;
    }
  | { kind: "DrawCards"; amount: number }
  | { kind: "SearchDeck"; criteria: SearchCriteria }
  | { kind: "ApplyStatus"; status: "Paralysis" | "Burn" | "Sleep" | "Poison" }
  | { kind: "DoNothing" }
  | { kind: "EnergyAcceleration"; amount: number; type?: string }
  | { kind: "DiscardEnergy"; amount: number; type?: string }
  | { kind: "BenchSwap"; target: "Self" | "Opponent" }
  | { kind: "SpreadDamage"; amount: number; targets: "AllOpponent" | "AllSelf" }
  | { kind: "AbilityLock"; duration: "ThisTurn" | "NextTurn" }
  | { kind: "DeckDisruption"; cards: number; target: "Opponent" | "Self" }
  | { kind: "Passive"; condition: Condition; effect: Effect }
  | { kind: "PreventEvolution"; target: "OpponentActive" }
  | { kind: "IsInPlay"; target: "Self" }
  | { kind: "Trigger"; event: TriggerEvent; effect: Effect }
  | { kind: "Heal"; amount: number }
  | { kind: "ModifyMaxHP"; amount: number }
  | { kind: "TurnEnd" };

export type Condition =
  | { kind: "CoinFlipHeads" }
  | { kind: "OpponentHasBench" }
  | { kind: "SelfHasBench" }
  | { kind: "Always" }
  | { kind: "HasEnergy"; type: string }
  | { kind: "HasStatus"; status: string };

export type SearchCriteria =
  | { kind: "PokemonOfType"; type: string }
  | { kind: "PokemonWithName"; name: string }
  | { kind: "AnyBasicPokemon" }
  | { kind: "TrainerCard" };

export type TriggerEvent =
  | { kind: "AttachEnergy"; target: "Self" | "Any" }
  | { kind: "TurnStart"; player: "Self" | "Opponent" }
  | { kind: "DamagedByAttack"; target: "Self" | "Opponent" };
