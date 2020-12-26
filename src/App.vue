<template>
  <nas-header></nas-header>
  <nas-newmedia></nas-newmedia><br>
  <input placeholder="Search media..." v-model.trim="searchKey">
  <section>
    <h3># of Movies in DB: {{ mediaCount }}</h3>
    <dl v-for="media in mediaSearch" :key="media">
      <dt>{{ media.title }}</dt>
      <dd>{{ media.format }}</dd>
      <dd>{{ media.type }}</dd>
      <dd>{{ media.location }}</dd>
    </dl>
  </section>
  <nas-footer></nas-footer>
</template>

<script>
  export default {
    data() {
      return {
        collection: [
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "6398f7cc-4835-4798-ab26-5f8cfef354f9",
            "format": "Blu-ray",
            "title": "Hulk VS",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "2e4733e6-e8ca-4d25-837d-672061460d09",
            "format": "Blu-ray",
            "title": "The Flash (2014) Season 5",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "bc2ef08d-11e6-4196-a7e1-798571a85458",
            "format": "Blu-ray",
            "title": "Silver Bullet",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "4a6a906e-e053-4224-a495-8a480693e56e",
            "format": "Blu-ray",
            "title": "Soldier",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "eba40eff-522d-4f3b-b5c9-e03f5c1c2c38",
            "format": "Blu-ray",
            "title": "Falling Skies",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "6b5f2768-e4b0-4a00-a194-437db7da100b",
            "format": "Blu-ray",
            "title": "Swamp Thing (2019)",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "efc39c1e-699a-42b9-9608-6fe6ac1c70e0",
            "format": "Blu-ray",
            "title": "Mean Girls",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "5ff51478-f4bb-42c2-b3ea-ed5c3cf193f1",
            "format": "4K Blu-ray",
            "title": "Wonder Woman Bloodlines",
            "type": "Movie"
          },
          {
            "location": "2nd Floor",
            "collection": "Yes",
            "other": [
              "X-MEN",
              "X2 X-MEN United",
              "X-MEN The Last Stand"
            ],
            "container": 3,
            "id": "fbeb072e-f57b-4496-a6a3-ca8d31e16cef",
            "format": "Blu-ray",
            "title": "X-MEN",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "b9e5e264-cda6-4dea-b353-5445117c452d",
            "format": "Blu-ray",
            "title": "Dragon Nest",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "6b581aeb-f5ed-4519-bf2a-f8f1e9ab2def",
            "format": "Blu-ray",
            "title": "Ferris Bueller's Day Off",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "1d978872-62f9-48ff-bfe0-052b13a6799b",
            "format": "4K Blu-ray",
            "title": "Ne Zha",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "fc809d74-2b95-4644-8437-0e82ddd52482",
            "format": "4K Blu-ray",
            "title": "X-MEN Dark Phoenix",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "eb6cbe86-7be3-463b-85f6-9cd33f4ae2f8",
            "format": "Blu-ray",
            "title": "Dragon",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "a841161e-368b-4c56-ac43-5adfbf897571",
            "format": "Blu-ray",
            "title": "Hours",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "392a7a95-040c-4d53-96ca-4e53b4121ffa",
            "format": "Blu-ray",
            "title": "Upgrade",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "7b919bc9-dee6-4a6b-bbc8-8799c1e388ed",
            "format": "4K Blu-ray",
            "title": "John Wick 3",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "472427e8-0d54-483b-b2e9-4ece043487a7",
            "format": "Blu-ray",
            "title": "Step Brothers",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "b91da897-0705-477e-8876-aef7058183e6",
            "format": "Blu-ray",
            "title": "Avatar",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "eda984ce-634f-49da-b5cb-986ce2aca776",
            "format": "Blu-ray",
            "title": "Batman Hush",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "d0965639-c33a-459d-8947-c8ff4cebd8a9",
            "format": "Blu-ray",
            "title": "Juno",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "18cec746-169e-47b5-a40e-e03917652c3d",
            "format": "Blu-ray",
            "title": "San Andreas",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "998b0143-71ac-4d95-96e4-ba4c45ea5fc3",
            "format": "Blu-ray",
            "title": "Avengers Infinity War",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "48142329-209d-4bed-88d2-e14d7e516df1",
            "format": "Blu-ray",
            "title": "Thor The Dark World",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "5cd63b2d-65f2-486c-9d99-ac2d41331472",
            "format": "Blu-ray",
            "title": "Barbershop",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "054f75c9-b4a7-44c4-8c96-9baddb5e7145",
            "format": "4K Blu-ray",
            "title": "Star Wars The Rise Of Skywalker",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "11a364b8-af4a-4558-b4cb-022ae0e4bd91",
            "format": "DVD",
            "title": "Born In East L.A.",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "5506aaf8-b6cb-4e93-8308-99f8ce6f1090",
            "format": "4K Blu-ray",
            "title": "Terminator 2 Judgement Day",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "4cd91efa-3a7c-42b0-b908-97f738954576",
            "format": "Blu-ray",
            "title": "White House Down",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "4fc97c02-b156-4112-aa8b-cd3ea143ce88",
            "format": "Blu-ray",
            "title": "Hancock",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "b22201d5-190b-46ec-9db7-8af6b531bd57",
            "format": "Blu-ray",
            "title": "The Shield",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "f22abf01-d0a1-4db0-b7cd-a76e515e95d7",
            "format": "Blu-ray",
            "title": "Paul Blart Mall Cop",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "0dfef5d7-cd3d-48c7-b9fa-8f53009b3b53",
            "format": "4K Blu-ray",
            "title": "Brightburn",
            "type": "Movie"
          },
          {
            "location": "2nd Floor",
            "collection": "Yes",
            "other": [
              "Kingsman - The Secret Service",
              "Kingsman - The Golden Circle"
            ],
            "container": 3,
            "id": "73f6fce0-0de8-416c-8f24-828a58ab90c8",
            "format": "Blu-ray",
            "title": "Kingsman",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "e5b5ef53-364c-4259-bcf1-4a9442866542",
            "format": "4K Blu-ray",
            "title": "Captain America Civil War",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "1a4a97f1-218b-4096-aeae-c24deb167122",
            "format": "Blu-ray",
            "title": "The Nutty Professor Collection",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "11a970bd-1a83-417f-a878-07aba8f8e5ce",
            "format": "4K Blu-ray",
            "title": "Starship Troopers Traitor Of Mars",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "d75cfff7-d66f-4217-a792-9302342f7d0c",
            "format": "4K Blu-ray",
            "title": "Days Of Thunder",
            "type": "Movie"
          },
          {
            "location": "2nd Floor",
            "collection": "Yes",
            "other": [
              "The Fast And The Furious",
              "2 Fast 2 Furious",
              "The Fast And The Furious: Tokyo Drift",
              "Fast & Furious",
              "Fast Five",
              "Fast & Furious 6",
              "Furious 7",
              "The Fate Of The Furious"
            ],
            "container": 3,
            "id": "3ed5a8e9-3587-4f9e-ac5a-7ad301386d16",
            "format": "4K Blu-ray",
            "title": "Fast & Furious",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "a02fc696-4de0-4fc6-8cb0-2550c7f63fad",
            "format": "Blu-ray",
            "title": "Beowulf",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "5133b57f-6223-4316-9768-ed883ce397b2",
            "format": "Blu-ray",
            "title": "Nick & Norah's Infinite Playlist",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "71b077e1-de78-4bf9-bf25-94df28a4f235",
            "format": "4K Blu-ray",
            "title": "The Secret Life Of Pets 2",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "ad40b988-373e-48c0-98d0-6c931a4b0e67",
            "format": "4K Blu-ray",
            "title": "E.T. The Extra-Terrestrial",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "ed417fa8-9183-45ed-a27d-0c2730b974a7",
            "format": "Blu-ray",
            "title": "Rise Of The Planet Of The Apes",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "f6e4a41d-1e13-4c1d-84d6-9885709ee645",
            "format": "Blu-ray",
            "title": "Starship Troopers Invasion",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "d6815f15-0281-4735-ba2f-36f9c48651ca",
            "format": "4K Blu-ray",
            "title": "Jupiter Ascending",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "da0a9a77-3352-4ea3-832b-8c2083b1ecfe",
            "format": "Blu-ray",
            "title": "Star Trek (2009)",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "4b6dcf48-1937-45e5-b0b7-aedb98fbb955",
            "format": "Blu-ray",
            "title": "Shaft",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "3e63679e-caca-4089-ad82-69e0e1e4a299",
            "format": "4K Blu-ray",
            "title": "Ex Machina",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "df4bef46-f13b-4225-8b30-a36a83bc7ebd",
            "format": "4K Blu-ray",
            "title": "The Invisible Man (2020)",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "846b8348-69b2-4a34-b49b-46b2eb8ac84e",
            "format": "4K Blu-ray",
            "title": "Terminator Dark Fate",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "c7b4fb26-db7e-42a0-a945-1f8d44c71fb1",
            "format": "Blu-ray",
            "title": "Falling Down",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "0c633c94-8c02-443e-98c1-81504ed09602",
            "format": "Blu-ray",
            "title": "Samurai Jack",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "56688c64-19e1-4788-bc98-132c6adf51d5",
            "format": "Blu-ray",
            "title": "Ghost",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "402abf7e-f97c-4387-8f8f-ac497ced0935",
            "format": "Blu-ray",
            "title": "Just Go With It",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "48efd9d8-a920-420f-9fea-f2e44ea55d54",
            "format": "Blu-ray",
            "title": "Zombieland",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "f28e29ab-feb4-40ad-bb36-bfca2d1f18f6",
            "format": "Blu-ray",
            "title": "Apocalypto",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "676a1c5c-15e7-427e-a0d4-0843c3b8804a",
            "format": "Blu-ray",
            "title": "Avengers End Game",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "e9213e6d-c075-4458-b7ab-1d118a7a23b5",
            "format": "Blu-ray",
            "title": "Bloodsport",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "cf4ab6c1-1a15-4946-8b71-c1ddfaaccdc7",
            "format": "Blu-ray",
            "title": "Veronica Mars",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "0bbd3f7e-10ba-4dd0-8eb7-422c717bde31",
            "format": "Blu-ray",
            "title": "Real Steel",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "10770056-98d1-49cf-aca8-9fbf059862cd",
            "format": "4K Blu-ray",
            "title": "Ghost In The Shell (1995)",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "ba409bd4-4969-458c-9cc9-cc15b1cad9d3",
            "format": "Blu-ray",
            "title": "The Martian",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "bec2ad54-ebf4-4e41-903a-999835222803",
            "format": "4K Blu-ray",
            "title": "Hellboy (2019)",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "fc376675-1ee4-4112-a3d1-ff90b73be328",
            "format": "Blu-ray",
            "title": "Spider-Man Homecoming",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "0993c868-bf42-460f-800b-56fe575b1d2e",
            "format": "Blu-ray",
            "title": "Evangelion - 3.33 You Can (NOT) Redo",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "27c894d6-cf02-469c-817b-0b6e258ada61",
            "format": "DVD",
            "title": "Dark Angel",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "a9e3e699-4cfc-402f-94c9-108185a02b44",
            "format": "Blu-ray",
            "title": "Paycheck",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "87ad85e9-0e14-4167-a9f3-6a9ed3a75d26",
            "format": "Blu-ray",
            "title": "The Dark Knight",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "a00356f5-9436-46d7-9ff3-9db37fecf50d",
            "format": "Blu-ray",
            "title": "Heat",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "f88ec845-b780-46c0-a95e-7c8f615e42b4",
            "format": "4K Blu-ray",
            "title": "Godzilla",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "c9a3c78b-af95-4c4d-952e-e13333260ec8",
            "format": "Blu-ray",
            "title": "District 9",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "582129fc-6a47-4a4c-9de2-bd6b95fb61f4",
            "format": "4K Blu-ray",
            "title": "It Chapter Two",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "de13627e-73d3-46f6-9ecf-6a4873f254e3",
            "format": "4K Blu-ray",
            "title": "Star Wars: The Empire Strikes Back",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "6cf6a506-ff09-4a9a-aa94-297fe09444cc",
            "format": "Blu-ray",
            "title": "The Cable Guy",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "1fb73a51-9c90-43cf-89ea-4223f268c47e",
            "format": "Blu-ray",
            "title": "Watchmen",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "c7511e0d-223f-485c-898b-7b52492314c0",
            "format": "Blu-ray",
            "title": "Idle Hands",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "e93a2d44-5112-4e77-b15c-1a55398cd979",
            "format": "4K Blu-ray",
            "title": "Iron Man 3",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "b27d0887-5add-4689-9a96-caf0d5d0b703",
            "format": "Blu-ray",
            "title": "The Strangers",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "6e294e26-0e66-4ab1-8dbe-f4336266c442",
            "format": "Blu-ray",
            "title": "Batman The Killing Joke",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "601a4058-7680-4591-81eb-60c44a591424",
            "format": "Blu-ray",
            "title": "Valerian And The City Of A Thousand Planets",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "1799c8ce-5f5e-4ebd-aad4-63139b1288b8",
            "format": "DVD",
            "title": "Parks and Recreation",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "18917dde-e88b-4431-a366-e1a43c67c887",
            "format": "4K Blu-ray",
            "title": "Iron Man 2",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "64c8e73a-0b03-4916-9404-e5260605a7f1",
            "format": "DVD",
            "title": "The Pacifier",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "a9c6e0a8-2dff-49ff-ba20-0112e8388708",
            "format": "Blu-ray",
            "title": "The Jackal",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "7554969e-a2a2-464f-95e7-4ab7afa5fb89",
            "format": "Blu-ray",
            "title": "The Hunger Games",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "448db0af-a09e-4815-a9e9-508420cd6867",
            "format": "Blu-ray",
            "title": "Castlevania Season 2",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "45937ce3-51a7-4ecb-9b3b-893b3e7924bc",
            "format": "Blu-ray",
            "title": "Let Me In",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "32b384eb-cf50-432e-96da-491f6d1b1550",
            "format": "4K Blu-ray",
            "title": "007 The Daniel Graig Collection",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "9c608a01-e55e-480a-947b-f23c97ace41f",
            "format": "4K Blu-ray",
            "title": "Rambo Last Blood",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "05f0de20-a2e2-488a-a0ff-afd6a3ff262a",
            "format": "4K Blu-ray",
            "title": "Joker",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "21ea59f4-dc44-473c-8bf3-2ff01e4fb9f3",
            "format": "4K Blu-ray",
            "title": "The Commuter",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "61dead64-be16-49a3-b81c-2def92665c7b",
            "format": "Blu-ray",
            "title": "The League Of Extraordinary Gentlemen",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "df28dac8-0574-4606-8f0d-dcca3fdb5d2a",
            "format": "Blu-ray",
            "title": "Rio",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "22fce2ab-47c6-4613-9ada-e2937b87f7ed",
            "format": "DVD",
            "title": "Cheaper By The Dozen",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "b7ca8e5c-9979-4302-a615-cbf198125578",
            "format": "4K Blu-ray",
            "title": "The Girl On The Train",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "4b18d20d-16ed-4469-b2f5-062475cc3faf",
            "format": "Blu-ray",
            "title": "Clear and Present Danger",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "6e1d4b23-d418-4f7b-8292-8b3c8d71764b",
            "format": "4K Blu-ray",
            "title": "Star Wars: A New Hope",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "285f6667-1cfb-4fc7-b6cf-f2e3940c1a88",
            "format": "4K Blu-ray",
            "title": "The Lion King (2019)",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "7005897b-a1f9-45a9-97e4-72585a63d1b7",
            "format": "Blu-ray",
            "title": "The Grinch (2018)",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "d96eca72-1291-4c9e-8fd4-a1a994a5b3d3",
            "format": "Blu-ray",
            "title": "10,000 BC",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "78b7e245-e2ff-4c6f-9ec6-dbf54b932efb",
            "format": "4K Blu-ray",
            "title": "The Incredible Hulk",
            "type": "Movie"
          },
          {
            "location": "2nd Floor",
            "collection": "Yes",
            "container": 3,
            "id": "ba2d0f61-e9df-4cda-8a19-f5026eba5ff0",
            "format": "Blu-ray",
            "title": "Scary Movie",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "342cd3a5-492e-474d-9195-a4e32429dca9",
            "format": "Blu-ray",
            "title": "Enchanted",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "9de72a43-9b3a-4590-b3ff-da2ee5c7c523",
            "format": "4K Blu-ray",
            "title": "Spies In Disguise",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "8f88547b-6618-4a99-918d-2186aec472f1",
            "format": "4K Blu-ray",
            "title": "The Maze Runner",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "af5e3d3a-d261-440e-b62b-7dc79f28e345",
            "format": "Blu-ray",
            "title": "We're The Millers",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "d73372c2-3863-469e-a3e3-da52ddd2dbe5",
            "format": "Blu-ray",
            "title": "Dark City",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "709cd510-a47f-436d-b18e-5e4cbb469b33",
            "format": "Blu-ray",
            "title": "Teen Wolf",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "ca8c2481-33bb-4960-9ae9-d83f50cc8f80",
            "format": "Blu-ray",
            "title": "X-MEN Origins Wolverine",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "de7c6e21-4cc6-427e-a9ab-a8953d428dbd",
            "format": "Blu-ray",
            "title": "Up",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "617e4b57-ba60-4ee2-be9e-1cd1d1e20e61",
            "format": "Blu-ray",
            "title": "The Karate Kid Part III, The Next Karate Kid",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "62fef832-d876-42cc-9a44-c84c200e146e",
            "format": "Blu-ray",
            "title": "The King Of Queens",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "d004375b-0d9c-4480-a195-f59db56b0655",
            "format": "Blu-ray",
            "title": "Deathstroke - Knights & Dragons",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "9079a292-ad48-48c7-9c3f-afb4086de734",
            "format": "Blu-ray",
            "title": "The Devil Wears Prada",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "3a228f89-8efa-4d15-9e5a-775323edbe08",
            "format": "4K Blu-ray",
            "title": "Schindler's List",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "1e6fa618-0635-4035-997d-f20355554689",
            "format": "Blu-ray",
            "title": "Sleepy Hollow",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "5a206506-f144-4049-9af9-512055ddf8a2",
            "format": "DVD",
            "title": "3rd Rock From The Sun",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "24754031-9f95-4db1-bc44-0ae6c1a01941",
            "format": "4K Blu-ray",
            "title": "Sonic The Hedgehog",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "2ca18c8a-1bda-4a98-8580-031d30221e4c",
            "format": "4K Blu-ray",
            "title": "Aladdin",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "f8aec9f9-e9de-49d0-be64-35dd51772791",
            "format": "4K Blu-ray",
            "title": "Maleficent Mistress Of Evil",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "382ee374-2e43-4850-96a7-df38bf054ae1",
            "format": "Blu-ray",
            "title": "Batman The Animated Series",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "f1abc2e7-ab95-463b-8917-81a0e627155a",
            "format": "Blu-ray",
            "title": "Chuck",
            "type": "TV Show"
          },
          {
            "location": "2nd Floor",
            "collection": "Yes",
            "other": [
              "Rise Of The Planet Of The Apes",
              "Dawn Of The Planet Of The Apes",
              "War For The Planet Of The Apes"
            ],
            "container": 3,
            "id": "7970f298-9260-4580-8342-e4dc9dcc29a2",
            "format": "4K Blu-ray",
            "title": "Planet Of The Apes",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "7dc0855f-b19a-469b-930f-1b91e0580877",
            "format": "4K Blu-ray",
            "title": "Dracula",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "77e03ef0-46af-4b97-9e98-755a5fd85b16",
            "format": "Blu-ray",
            "title": "Kung Fu Panda 2",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "1c110840-9a36-4562-8f6a-5096b00d77e3",
            "format": "Blu-ray",
            "title": "The Blind Side",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "b93b1bd4-60f2-4eb4-912a-69115b01f2ff",
            "format": "4K Blu-ray",
            "title": "Godzilla King Of The Monsters",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "2a6797f6-a1a6-4235-82c9-3cb33b715fa8",
            "format": "4K Blu-ray",
            "title": "Logan",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "bdda550b-6bfb-4041-aa46-53a0fc59f907",
            "format": "4K Blu-ray",
            "title": "Batman Assault On Arkham",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "bf1b3e26-ba36-4424-9d44-93efabd68094",
            "format": "Blu-ray",
            "title": "The Addams Family",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "59f7cdc8-e8d9-48e0-ba31-f626fe4bb3d8",
            "format": "4K Blu-ray",
            "title": "IT (2017)",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "8daeeb1e-82f7-464b-bf78-17e37490c20b",
            "format": "Blu-ray",
            "title": "Romeo Must Die",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "ac1983bd-e0ea-446f-b148-206f7f41ff0e",
            "format": "4K Blu-ray",
            "title": "Superman - Man Of Tomorrow",
            "type": "Movie"
          },
          {
            "location": "2nd Floor",
            "collection": "Yes",
            "other": [
              "The Princess Diaries",
              "The Princess Diaries 2: Royal Engagement"
            ],
            "container": 3,
            "id": "f941a81c-6f74-40e9-a011-d0210071543c",
            "format": "Blu-ray",
            "title": "The Princess Diaries",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "04c37d70-5dc9-4b2d-af22-a1001b4404dc",
            "format": "Blu-ray",
            "title": "The Whole Nine Yards",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "0369e96b-0239-49c3-9b24-1ed0ca81370e",
            "format": "4K Blu-ray",
            "title": "Maze Runner: The Death Cure",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "b9d0f760-2c20-401a-8544-2d40062eadde",
            "format": "4K Blu-ray",
            "title": "Knives Out",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "1e4e268b-47c5-48b7-b2f2-9d0d0a2daf0a",
            "format": "Blu-ray",
            "title": "Ferdinand",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "4a867114-39a2-48b2-937f-563109b2eb3b",
            "format": "Blu-ray",
            "title": "Cinderella",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "22a22052-3248-4746-a2e3-503dd025a5ec",
            "format": "Blu-ray",
            "title": "Jingle All The Way",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "83dfd548-aa2e-4d71-87bb-97df3bd4feb1",
            "format": "DVD",
            "title": "The Chappelle's Show",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "aa861c47-4117-4e6e-bb03-8db6b8a622c1",
            "format": "Blu-ray",
            "title": "The Magnificent Seven",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "cda92138-d306-4eb7-a53e-7a03c9bc5b29",
            "format": "Blu-ray",
            "title": "I, Frankenstein",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "5ee1dee4-1f99-4890-81cd-5db0fe637452",
            "format": "4K Blu-ray",
            "title": "Superman Red Son",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "e8db7d2d-3a5e-4678-9404-4b3b164d003c",
            "format": "4K Blu-ray",
            "title": "Starship Troopers",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "647fc97e-27f0-4f3e-988d-05a67ca5697b",
            "format": "Blu-ray",
            "title": "Timecop",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "3b6badbd-b0fd-42d7-8fa2-9a6306f76ad3",
            "format": "Blu-ray",
            "title": "Ronin",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "d622fcb2-0829-44bf-a83b-cdf073c788ad",
            "format": "Blu-ray",
            "title": "Surrogate",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "735db1a6-6975-4fa1-8b2a-5f3aa1d3c6c5",
            "format": "Blu-ray",
            "title": "SHAZAAM!",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "7d06d9b5-eead-43d4-9272-1abf6ae09cd7",
            "format": "Blu-ray",
            "title": "Barbershop 2 Back In Business",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "2d0999b3-2a31-4ff5-9477-32b6de3514a5",
            "format": "Blu-ray",
            "title": "Patriot Games",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "778dabe6-8cad-482f-a189-01b6f87191f8",
            "format": "4K Blu-ray",
            "title": "Ghost In The Shell (1995)",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "dbbddc4d-ecd6-4e2e-b2bc-df0e8d700a1d",
            "format": "Blu-ray",
            "title": "The Transformers The Movie",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "70e94d8d-b71f-41f5-a8bd-3e1fda60b5f8",
            "format": "Blu-ray",
            "title": "Thor",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "a8b873c6-868b-428a-80ec-ed7631e726e8",
            "format": "Blu-ray",
            "title": "Appleseed",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "b8838bef-c306-44da-9e62-ae4631f8d88d",
            "format": "4K Blu-ray",
            "title": "Harry Potter",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "19b41132-946b-4cbd-bb34-e2d3d8b8c719",
            "format": "Blu-ray",
            "title": "Continuum Season Two",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "06a161a8-3d2f-4eae-b856-d7d80b7d0a8f",
            "format": "Blu-ray",
            "title": "Batman Year One",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "2b03347f-da5e-4616-9eda-939d37e14ac3",
            "format": "Blu-ray",
            "title": "The Accountant",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "ffec1bd3-7ebb-42a8-b6fb-b141be1d401d",
            "format": "DVD",
            "title": "Sabrina The Teenage Witch",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "616221e8-86d1-4a18-a394-5107f8e16da7",
            "format": "Blu-ray",
            "title": "Ash vs Evil Dead",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "f2a43aea-2103-4ce6-9197-81dc4f31fedf",
            "format": "4K Blu-ray",
            "title": "Frozen II",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "3a36291f-1252-438d-937d-47b24e60b01b",
            "format": "4K Blu-ray",
            "title": "Zombieland Double Tap",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "c8182a87-b33d-43ca-a415-dea7109eae54",
            "format": "4K Blu-ray",
            "title": "Warcraft",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "d813ce1c-1523-493d-810e-eb45cefd3bf8",
            "format": "Blu-ray",
            "title": "Where The Wild Things Are",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "dbd65624-7368-4826-afaa-080894cbc17e",
            "format": "Blu-ray",
            "title": "They Live",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "b4a318dc-07a6-4a57-ad99-6bacd8cf4ef0",
            "format": "Blu-ray",
            "title": "The Space Between Us",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "4c15a493-bca9-4741-a2e9-0e88258ea747",
            "format": "Blu-ray",
            "title": "Yes Man",
            "type": "Movie"
          },
          {
            "location": "2nd Floor",
            "collection": "Yes",
            "other": [
              "It's The Great Pumpkin, Charlie Brown",
              "A Charlie Brown Thanksgiving",
              "A Charlie Brown Christmas"
            ],
            "container": 3,
            "id": "5c362020-d048-4d1c-8565-6d25a1c36fd8",
            "format": "4K Blu-ray",
            "title": "Peanuts Holiday Collection",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "b5787385-2d2a-4e07-9c1b-e8748e58918f",
            "format": "Blu-ray",
            "title": "Guilt Trip",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "eea5eb06-7711-41d2-9f17-e68379761746",
            "format": "4K Blu-ray",
            "title": "Bloodshot",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "0e75fef1-dfec-4134-9d9d-83b9cfc11f86",
            "format": "Blu-ray",
            "title": "Hellboy II The Golden Army",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "839c1b09-5faf-47d2-a5b1-f6ece7e18532",
            "format": "4K Blu-ray",
            "title": "Cars 2",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "499ed8d6-5e78-4d5f-9093-96fa29b7e608",
            "format": "Blu-ray",
            "title": "Claymore",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "aa26d593-cb67-4af6-92b1-6c17086b161e",
            "format": "Blu-ray",
            "title": "The Interview",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "35dc1b57-edfa-4fd9-8a49-f5db2c682440",
            "format": "4K Blu-ray",
            "title": "Star Wars: Return Of The Jedi",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "c35616dc-9d5a-4441-b150-b0c683eda22a",
            "format": "Blu-ray",
            "title": "Judge Dredd",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "bf163acd-ab13-4792-83f1-2191e0cb15fb",
            "format": "4K Blu-ray",
            "title": "Overlord",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "3c2de151-c967-4006-8568-ff34aff10b67",
            "format": "Blu-ray",
            "title": "The Wizard",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "58755b01-5be6-4096-a908-973f6a396867",
            "format": "Blu-ray",
            "title": "Changing Lanes",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "8c43d423-d75d-483f-9f49-223afa4d788d",
            "format": "4K Blu-ray",
            "title": "Jumanji The Next Level",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "ee8da3f4-c14e-4284-b234-bd396fd5d40d",
            "format": "Blu-ray",
            "title": "Star Wars (IV, V, VI)",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "6847f90f-d05d-43d2-bcbe-db78c36a75d1",
            "format": "4K Blu-ray",
            "title": "Hocus Pocus",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "1c088c47-a711-4fed-b728-49420643742b",
            "format": "4K Blu-ray",
            "title": "Captain America The First Avenger",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "04da3797-f307-4d28-9fae-4605ca989fc1",
            "format": "4K Blu-ray",
            "title": "Ad Astra",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "b0656e92-fd3f-44cc-88bf-d16ebf4bc9e4",
            "format": "Blu-ray",
            "title": "Roger Rabbit",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "589481bb-12be-4322-a97a-24580c4d4b05",
            "format": "4K Blu-ray",
            "title": "Aquaman",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "ecf3c927-02c9-41ae-9b80-4c08df921798",
            "format": "Blu-ray",
            "title": "Alita Battle Angel",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "b5f2503b-3106-4ff9-aed1-95fb50018d5f",
            "format": "Blu-ray",
            "title": "Face/Off",
            "type": "Movie"
          },
          {
            "location": "2nd Floor",
            "collection": "Yes",
            "container": 3,
            "id": "3ad32361-3568-4636-aa5d-38f426aef38a",
            "format": "Blu-ray",
            "title": "The Matrix",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "f327dd50-d709-4f19-ac24-15ca84607fe7",
            "format": "Blu-ray",
            "title": "Punisher War Zone",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "15c96205-e6a1-408c-a412-fa595b4247b4",
            "format": "Blu-ray",
            "title": "Kick-Ass",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "17ef07af-1ea2-4a76-8351-5885bf40cbf3",
            "format": "DVD",
            "title": "The Flash (1990)",
            "type": "TV Show"
          },
          {
            "location": "2nd Floor",
            "notes": "BD+ protection prevents DVDFab ripping, but not an issue for MakeMKV.",
            "container": 3,
            "id": "25d3fd45-b4fe-4a7b-bfff-b72caf4e7aa0",
            "format": "Blu-ray",
            "title": "This Means War",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "0414c0bf-257e-41a9-bf7b-ab102d658b85",
            "format": "Blu-ray",
            "title": "Continuum Season 1",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "6270736d-3dc6-4ddb-ab27-d0ad09f2968d",
            "format": "Blu-ray",
            "title": "Green Lantern",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "6ce3ac1c-d723-4ca6-956a-f8228fb6bc3c",
            "format": "Blu-ray",
            "title": "American Beauty",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "9153f0f6-ea5b-4d00-a169-a75bcde591a2",
            "format": "Blu-ray",
            "title": "Buffy The Vampire Slayer",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "32c734a9-46aa-49fc-87da-aa5e87008de0",
            "format": "4K Blu-ray",
            "title": "Iron Man",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "d99688df-8f30-4968-aa19-4457bb3fbf31",
            "format": "4K Blu-ray",
            "title": "Us",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "5d82eda2-8087-46b9-9f5e-36e00c4d83cc",
            "format": "Blu-ray",
            "title": "Easy A",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "5928bdcf-979b-402f-b20a-c57113f85270",
            "format": "Blu-ray",
            "title": "Superman/Batman Apocalypse",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "f38760fd-81e6-4c51-9b17-561d0864d099",
            "format": "Blu-ray",
            "title": "Carrie",
            "type": "Movie"
          },
          {
            "location": "2nd Floor",
            "collection": "Yes",
            "container": 3,
            "id": "52d0ee54-4114-4e4a-9e98-ab35abba2d21",
            "format": "Blu-ray",
            "title": "National Treasure",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "01ca76de-b1f4-4e22-85e9-aa0ae4d3469a",
            "format": "Blu-ray",
            "title": "Leprechaun Returns",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "4ddeec8b-71d4-4307-8a7b-826dc0e543dc",
            "format": "Blu-ray",
            "title": "Pokemon Detective Pikachu",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "bb5e265a-1353-4c4b-a176-7f95705d165e",
            "format": "Blu-ray",
            "title": "Friends",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "92a95b16-da04-4b7b-8c71-f50922cd4ab7",
            "format": "4K Blu-ray",
            "title": "Spider-Man Far From Home",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "f1e81ad9-b7aa-4f1a-81d1-4fd7f56d8d77",
            "format": "Blu-ray",
            "title": "Seven Pounds",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "07934760-4079-4c55-8e2a-e3366116b4a1",
            "format": "Blu-ray",
            "title": "The Sopranos",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "06f45be9-9899-4ac3-871b-2b682088852d",
            "format": "Blu-ray",
            "title": "Selena",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "9c0f2705-0a45-4cae-8482-0cb5f4d213cc",
            "format": "4K Blu-ray",
            "title": "Angel Has Fallen",
            "type": "Movie"
          },
          {
            "location": "2nd Floor",
            "collection": "Yes",
            "other": [
              "Transformers",
              "Transformers: Revenge Of The Fallen",
              "Transformers: Dark Of The Moon",
              "Transformers: Age Of Extinction",
              "Transformers: The Last Knight"
            ],
            "container": 3,
            "id": "144e28e2-2f47-40c4-b02f-b86073390816",
            "format": "4K Blu-ray",
            "title": "Transformers",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "48d8adde-f367-4067-a835-8dfdccf75a04",
            "format": "4K Blu-ray",
            "title": "Universal Soldier",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "0b3203c9-8c4c-4ad7-82ce-50123ed585dc",
            "format": "4K Blu-ray",
            "title": "Frozen",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "d80d81b5-1599-4633-894e-b6912c247ef5",
            "format": "4K Blu-ray",
            "title": "Toy Story 4",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "f1b9cd2c-b093-4c4b-b181-ea2aad064da0",
            "format": "Blu-ray",
            "title": "Snatch",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "1f54d63d-6cb3-463d-aefb-cd0a208b5ae0",
            "format": "Blu-ray",
            "title": "The Sum Of All Fears",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "634a914d-7fb4-421d-9659-61921682a7fb",
            "format": "Blu-ray",
            "title": "Rick and Morty (Season 4)",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "c94f1a48-0bb0-4d19-b941-c2504735f320",
            "format": "4K Blu-ray",
            "title": "Ghost In The Shell",
            "type": "Movie"
          },
          {
            "location": "2nd Floor",
            "collection": "No",
            "other": [
              "Young Justice",
              "Young Justice: Invasion",
              "Young Justice: Outsiders"
            ],
            "container": 3,
            "id": "13584abe-4919-4713-9124-5f4460935021",
            "format": "Blu-ray",
            "title": "Young Justice",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "8ef34a5b-bd2f-4eca-9343-5e3302436ea5",
            "format": "4K Blu-ray",
            "title": "Cars 3",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "f5787148-5148-4540-9cf9-8fb64ddfb3a5",
            "format": "Blu-ray",
            "title": "Batman Beyond",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "b3ba1388-54e0-48f2-ba0f-a9a9646c8fda",
            "format": "Blu-ray",
            "title": "Grown Ups",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "18ad876b-c06b-4eb8-a254-f33a4634de1a",
            "format": "Blu-ray",
            "title": "Scary Movie 4",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "dfbc9be5-4815-4ba8-b907-07799fa68c32",
            "format": "4K Blu-ray",
            "title": "John Wick",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "7c4e4d05-1074-4788-8922-4ce0a47828ca",
            "format": "Blu-ray",
            "title": "Bad Santa",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "8170a1b3-a40e-4eea-bbf6-1ad0a818ac2b",
            "format": "4K Blu-ray",
            "title": "Justice League Dark Apokolips War",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "0437261e-e965-4a34-a9c0-fb8f89c43f29",
            "format": "Blu-ray",
            "title": "Deep Impact",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "2e993779-534f-452a-969b-dcefdbfa80f0",
            "format": "Blu-ray",
            "title": "Police Academy",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "4f98ab53-4dad-4902-9c18-ee4cafd3fad2",
            "format": "Blu-ray",
            "title": "White Men Can't Jump",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "92f99055-9bac-4a08-9ace-d4fd40758a0a",
            "format": "Blu-ray",
            "title": "Maid In Manhattan",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "68c2c9c4-1f76-4d45-91bf-56c5c1cfa1ca",
            "format": "Blu-ray",
            "title": "After Earth",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "c16f23a5-89b7-4b32-b2d1-979c51842df0",
            "format": "4K Blu-ray",
            "title": "John Wick 2",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "130099fd-e40c-4142-b1e5-2a31507b1fc7",
            "format": "4K Blu-ray",
            "title": "Cars",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "53577e70-f4b2-4574-8886-cf7e8e009e68",
            "format": "4K Blu-ray",
            "title": "Captain Marvel",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "dd30d7ec-0797-40e5-8fa2-a5e3f5254777",
            "format": "Blu-ray",
            "title": "Attack on Titan Season 2",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "927449ca-004d-4ee0-8772-c34621d9a121",
            "format": "Blu-ray",
            "title": "True Grit",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "2584468a-aaa3-437f-a263-e35d3ccad083",
            "format": "Blu-ray",
            "title": "PAUL",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "40657be5-8c09-414b-b275-242d4d6beacc",
            "format": "Blu-ray",
            "title": "The Big Bang Theory",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "03863060-2d43-427a-9e8a-24a14d0ac8a9",
            "format": "Blu-ray",
            "title": "Transformers Dark Of The Moon",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "9959ce49-7cc6-491e-ae9f-3bc5f5007b6e",
            "format": "DVD",
            "title": "Raising Hope",
            "type": "TV Show"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "6647f6be-6f0c-40a8-8603-ea0bd36dddef",
            "format": "4K Blu-ray",
            "title": "Mortal Kombat Legends Scorpion's Revenge",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "f32e9a9e-eed3-4da4-8b43-32cba9ddb9e7",
            "format": "4K Blu-ray",
            "title": "Hobbs & Shaw",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "120976a3-f46d-466b-b637-46152c4df53f",
            "format": "Blu-ray",
            "title": "Tucker & Dale vs. Evil",
            "type": "Movie"
          },
          {
            "location": "2nd Floor",
            "collection": "Yes",
            "container": 3,
            "id": "810e13a6-d756-4f43-802f-152e4cc1eaf7",
            "format": "Blu-ray",
            "title": "Father Of The Bride",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "f7c9b63c-eecc-4143-abdf-09eab2ba487f",
            "format": "4K Blu-ray",
            "title": "Onward",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "66acc1c5-0d2e-4575-96ff-e57b7d08ff9a",
            "format": "4K Blu-ray",
            "title": "Hook",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "cd333377-ba78-4ce0-8c23-93a7ba1118c6",
            "format": "Blu-ray",
            "title": "Barbershop The Next Cut",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "66de845a-8915-4700-888b-65fd01e9b40e",
            "format": "4K Blu-ray",
            "title": "Baby Driver",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "3b0a4d28-0071-4315-b26e-c87a41705ab4",
            "format": "Blu-ray",
            "title": "Crash",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "84d8632a-b828-46b0-b60e-0c80fa0e70f3",
            "format": "Blu-ray",
            "title": "Good Morning Vietnam",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "5fbea8ce-f4ce-4279-b380-e4ec459b5136",
            "format": "4K Blu-ray",
            "title": "Bad Boys For Life",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "a40b7067-939f-475a-af10-6b1bc23d5a49",
            "format": "Blu-ray",
            "title": "Appleseed XIII Tartaros & Ourands",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "8a971fdf-272e-4f62-affb-9152fae1e0f6",
            "format": "4K Blu-ray",
            "title": "Finding Nemo",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "42cd94b4-3433-4d9d-90e1-a364cc742c63",
            "format": "Blu-ray",
            "title": "Pixar Short Films Collection 3",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "039cb326-78fc-4675-a84a-ab89eea0589e",
            "format": "Blu-ray",
            "title": "Central Intelligence",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "c88bf434-3733-4d4e-815c-effdac5be695",
            "format": "4K Blu-ray",
            "title": "Mortal Engines",
            "type": "Movie"
          },
          {
            "container": 3,
            "location": "2nd Floor",
            "id": "89efdaad-f8b9-42a1-819a-99faa36d648d",
            "format": "4K Blu-ray",
            "title": "Black Panther",
            "type": "Movie"
          }
        ],
        searchKey: ''
      };
    },
    computed: {
      mediaCount() {
        return this.collection.length;
      },
      mediaSearch() {
        return this.collection.filter(media => {
          return media.title.toLowerCase().includes(this.searchKey.toLowerCase());
        });
      }
    },
    methods: {}
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  body {
    background-color: #f0f0f0;
    font-family: Roboto, sans-serif;
    margin: 0 15px;
  }
  h1 {
    font-size: 3rem;
  }
  dl, p {
    font-size: 1.6rem;
  }
  dt {
    font-weight: 500;
  }
</style>