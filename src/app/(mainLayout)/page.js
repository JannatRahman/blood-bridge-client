import Banner from "@/components/Banner";
import BloodDonationBenefits from "@/components/BloodDonationBenefits";
import ContactUs from "@/components/ContactUs";
import LimitedDonationCards from "@/components/LimitedDonationCards";


export default function Home() {
  return (
    <div className="bg-[#F3EDC8">
     <Banner/>
     <LimitedDonationCards/>
     <ContactUs/>
     <BloodDonationBenefits/>
     
    </div>
  );
}
