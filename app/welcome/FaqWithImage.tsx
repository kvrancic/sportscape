import { Image, Accordion, Grid, Container, Title } from '@mantine/core';
import image from './image.svg';
import classes from './FaqWithImage.module.css';

export function FaqWithImage() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src={image.src} alt="Frequently Asked Questions" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} ta="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion chevronPosition="right" defaultValue="add-listing" variant="separated">
              <Accordion.Item className={classes.item} value="add-listing">
                <Accordion.Control>How do I add a new sports venue listing?</Accordion.Control>
                <Accordion.Panel>
                  To add a new sports venue listing, log in to your account, navigate to the &quot;Add New Listing&quot; section, and enter the required details such as time, location, sport type, number of available spots, and price. Submit the form to create your listing.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="search-purchase">
                <Accordion.Control>How can I find available slots to purchase?</Accordion.Control>
                <Accordion.Panel>
                  To find available slots for purchase, log in to your account, go to the &quot;Search for Slots&quot; section, and enter your criteria such as location, time, date, and sport. Click &quot;Search&quot; to see a list of available slots that match your criteria.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="join-slot">
                <Accordion.Control>How can I join an existing slot?</Accordion.Control>
                <Accordion.Panel>
                  To join an existing slot, log in to your account, navigate to the &quot;Search for Slots to Join&quot; section, and enter your search criteria such as location, sport, level, and whether the slot is recurring or one-time. Click &quot;Search&quot; to view available slots and click &quot;Join&quot; to send a request to the slot owner.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="manage-profile">
                <Accordion.Control>How do I update my profile information?</Accordion.Control>
                <Accordion.Panel>
                  To update your profile information, log in to your account, go to your profile page, and click on &quot;Edit Profile.&quot; You can update details such as your profile picture, age, height, weight, and fitness level. Save the changes to update your profile.
                </Accordion.Panel>
              </Accordion.Item>
              
              <Accordion.Item className={classes.item} value="contact-support">
                <Accordion.Control>How can I contact support?</Accordion.Control>
                <Accordion.Panel>
                  If you need assistance, you can contact me via the &quot;kv54199@fer.hr&quot; email. We&apos;re here to help with any questions or issues you may have.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
