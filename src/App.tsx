import * as React from 'react';
import './App.css';

import Rake from "./controller/Rake";
import SentenceKeyword from "./controller/SentenceKeyword";
import SentenceText from "./controller/SentenceText";
import TextRank from "./controller/TextRank";
import logo from './logo.svg';

class App extends React.Component {
    private static textRank(): any {
        const s: string = "The Facade is a structural pattern to provide a unified set of interfaces for a subsystem. Subsystems can contain a large amount of code that even if well designed can be difficult for a client to learn to correctly use. Facades provide coherent simplifications of modules for performing common tasks. It is not uncommon for a subsystem to have multiple facades for different client use cases. Facades are usually easy to implement once you have a complex subsystem that you want to provide a more unified high-level interface to.\n" +
            "\n" +
            "One important note is that while a facade can simplify a subsystem, it does not prohibit clients from accessing features within the subsystem directly. Facades are mainly a pattern of convenience to make it easier for clients without restricting their options; however, if a client does only use the facade to access the subsystem they are also more insulated from structural changes within the subsystem as only the facade itself should have to be updated to support these, rather than the client themselves. One way to think about facades is that they essentially insert a layer into the design between the client and the subsystem. In architectural terms this is a 'non-strict' layer, since the client can bypass the facade to access the internals.\n" +
            "\n" +
            "Consider the following WebmailClient. This class is tightly bound to all of the subsystem code; if it wants to compose an email with an attachment or an appointment it needs to collaborate with many different classes. The author of WebmailClient is almost certainly a different developer than the creator of all of those classes so they need to learn a large set of APIs (both which APIs to all, and in what order) to complete their task. Additionally, any changes to those APIs could impact their code; since there are so many direct dependencies the chances of a change impacting their system is not small.\n" +
            "\n" +
            "To ameliorate this, they talk to the developers responsible for the PIM code and ask them to create a Facade that is easier for them to use for these common tasks. The PIM owner creates PIMFacade that hides the internal details of the PIM subsystem and allows WebmailClient to have only a single dependency. This decreases coupling between the client and the PIM classes, and adds a layer of abstraction so the PIM subsystem owner can simply update the PIMFacade if any of their internal classes change in a way that could propagate to the client. This both simplifies modification tasks for the owner of WebmailClient as they are insulated from these changes, but also for the owner of PIMFacade because they know they can make larger changes as long as they do not need to change the facade API.";

        try {
            const st = new SentenceText(s);
            const tr = new TextRank(st);
            console.log(tr);
            console.log(tr.getRankedSummary(5));
            console.log(tr.getOriginalOrderSummary(5));

            const sk = new SentenceKeyword(s);
            const rk = new Rake(sk);

            console.log(rk)
        } catch (err) {
            console.log(err);
        }
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
                <button onClick={App.textRank}>click</button>
            </div>
        );
    }
}

export default App;
